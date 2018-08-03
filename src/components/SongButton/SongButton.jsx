import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Styles //

import './SongButton.css';

// Actions //

import { setSongActivity } from '~/actions/song';
import { removeItem } from '~/actions/order';

// Constants //

import { NEW_STATE_PERIOD } from '~/constants';

// Components //

import InfoText from '~/components/InfoText/InfoText';
import Label from '~/components/Label/Label';

class SongButton extends Component {
  setSongActivity = () => {
    this.props.setSongActivity(this.props.data.id, false);
    this.props.removeItem(this.props.data.id);
  }

  render() {
    const { className, data, authors, setSongActivity, removeItem, editable, ...restProps } = this.props;
    const { title, author = 'Неизвестен', created } = data;

    const isNew = moment().dayOfYear() - moment(created).dayOfYear() <= NEW_STATE_PERIOD;

    return (
      <div className={`song-button ${className ? className : ''}`} {...restProps}>
        <div className="song-button__top">
          <h3 className="song-button__title">{title}</h3>
          { editable && <button className='song-button__close' onClick={this.setSongActivity}></button> }
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

export default connect(mapStateToProps, { setSongActivity, removeItem })(SongButton);