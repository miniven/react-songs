import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongItem.css';

// Actions //

import { setSongActivity } from '~/actions/song';

// Components //

import Button from '~/components/Button/Button';
import InfoText from '~/components/InfoText/InfoText';

class SongItem extends Component {
  setSongActivity = () => {
    this.props.setSongActivity(this.props.data.id, true);
  }

  render() {
    const { className, data } = this.props;
    const { title, author = 'Неизвестен', genre = 'Неизвестен' } = data;

    return (
      <article className={`song-item ${className ? className : ''}`}>
        <header className='song-item__header'>
          <h3 className='song-item__title'>{title}</h3>
        </header>
        <div className='song-item__info'>
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <InfoText mod='author' value={author} />
            </div>
            <div className="col-xs-12 col-md-3">
              <InfoText mod='genre' value={genre} />
            </div>
          </div>
        </div>
        <Button className='button--add' onClick={this.setSongActivity}>Добавить</Button>
      </article>
    );
  }
};

export default connect(null, { setSongActivity })(SongItem);
