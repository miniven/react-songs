import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongButton.css';

// Actions //

import { setSongActivity } from '~/actions/song';

// Somponents //

import InfoText from '~/components/InfoText/InfoText';

class SongButton extends Component {
  setSongActivity = () => {
    this.props.setSongActivity(this.props.data.id, false);
  }

  render() {
    const { className, data, setSongActivity, ...restProps } = this.props;
    const { title, author = 'Неизвестен' } = data;

    return (
      <div className={`song-button ${className ? className : ''}`} {...restProps}>
        <div className="song-button__top">
          {title}
          <button className='song-button__close' onClick={this.setSongActivity}></button>
        </div>
        <InfoText mod='author' value={author} />
      </div>
    );
  }
};

export default connect(null, { setSongActivity })(SongButton);