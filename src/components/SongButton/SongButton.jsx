import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongButton.css';

// Actions //

import { setSongActivity } from '~/actions/song';

class SongButton extends Component {
  setSongActivity = () => {
    this.props.setSongActivity(this.props.data.id, false);
  }

  render() {
    const { className, data, ...restProps } = this.props;

    return (
      <div className={`song-button ${className ? className : ''}`} {...restProps}>
        {data.title}
        <button className='song-button__close' onClick={this.setSongActivity}></button>
      </div>
    );
  }
};

export default connect(null, { setSongActivity })(SongButton);