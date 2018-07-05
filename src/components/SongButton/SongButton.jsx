import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongButton.css';

// Actions //

import { setSongActivity } from '~/actions/song';
import { removeItem } from '~/actions/order';

// Somponents //

import InfoText from '~/components/InfoText/InfoText';

class SongButton extends Component {
  setSongActivity = () => {
    this.props.removeItem(this.props.data.id);
    this.props.setSongActivity(this.props.data.id, false);
  }

  render() {
    const { className, data, authors, setSongActivity, removeItem, ...restProps } = this.props;
    const { title, author = 'Неизвестен' } = data;

    return (
      <div className={`song-button ${className ? className : ''}`} {...restProps}>
        <div className="song-button__top">
          <h3 className="song-button__title">{title}</h3>
          <button className='song-button__close' onClick={this.setSongActivity}></button>
        </div>
        <InfoText mod='author' value={authors[author]} />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  authors: state.authors,
});

export default connect(mapStateToProps, { setSongActivity, removeItem })(SongButton);