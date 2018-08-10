import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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

    const isNew = moment().dayOfYear() - moment(created).dayOfYear() <= NEW_STATE_PERIOD;

    return (
      <div className={`song-button ${className ? className : ''}`} {...restProps}>
        <div className="song-button__top">
          <h3 className="song-button__title">{title}</h3>
          { editable && <IconButton className='song-button__close' onClick={historyID ? this.removeItemFromOrder : this.setSongActivity} type='close' /> }
        </div>
        <div className="song-button__middle">
          <InfoText mod='author' value={authors[author]} />
          { isNew && <Label type='new' /> }
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  authors: state.authors,
});

export default connect(mapStateToProps, { setSongActivity, removeItem, removeItemFromOrder })(SongButton);