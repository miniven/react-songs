import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SortableHandle } from 'react-sortable-hoc';

// Styles //

import './SongButton.css';

// Actions //

import { setSongActivity } from '~/actions/song';
import { removeItem, removeItemFromOrder } from '~/actions/order';

// Constants //

import { NEW_STATE_PERIOD } from '~/constants';

// Components //

import InfoText from '~/components/InfoText/InfoText';
import Label from '~/components/Label/Label';
import IconButton from '~/components/IconButton/IconButton';

class SongButton extends Component {
  setSongActivity = () => {
    this.props.setSongActivity(this.props.data.id, false);
    this.props.removeItem(this.props.data.id);
  }

  removeItemFromOrder = () => {
    this.props.removeItemFromOrder(this.props.historyID, this.props.data.id);
  }

  render() {
    const {
      className,
      data,
      authors,
      setSongActivity,
      removeItem,
      removeItemFromOrder,
      editable,
      historyID,
      ...restProps
    } = this.props;

    const { title, author = 'Неизвестен', created } = data;
    const DragHandle = editable ? SortableHandle((props) => <div {...props}></div>) : false;
    const isNew = moment().dayOfYear() - moment(created).dayOfYear() <= NEW_STATE_PERIOD;

    return (
      <div className={`song-button ${className ? className : ''}`} {...restProps}>
        <div className='song-button__inner'>
          <div className="song-button__content">
            <h3 className="song-button__title">{title}</h3>
            <InfoText mod='author' value={authors[author]} />
            { isNew && <Label className='song-button__label' type='new' /> }
          </div>
          { editable && <IconButton className='song-button__close' onClick={historyID ? this.removeItemFromOrder : this.setSongActivity} type='close' /> }
        </div>
        { editable && <DragHandle className='song-button__handle' /> }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  authors: state.authors,
});

export default connect(mapStateToProps, { setSongActivity, removeItem, removeItemFromOrder })(SongButton);