import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Styles //

import './SongItem.css';

// Actions //

import { setSongActivity } from '~/actions/song';
import { addItem } from '~/actions/order';

// Constants //

import { NEW_STATE_PERIOD } from '~/constants';

// Components //

import Button from '~/components/Button/Button';
import InfoText from '~/components/InfoText/InfoText';
import Label from '~/components/Label/Label';

class SongItem extends Component {
  setSongActivity = () => {
    this.props.setSongActivity(this.props.data.id, true);
    this.props.addItem(this.props.data.id);
  }

  render() {
    const { className, data, genres, authors } = this.props;
    const { title, author, genre, lastChosen, created } = data;

    const lastDate = moment(lastChosen).format('DD.MM.YYYY');
    const isNew = moment().dayOfYear() - moment(created).dayOfYear() <= NEW_STATE_PERIOD;

    return (
      <article className={`song-item ${className ? className : ''}`}>
        <header className='song-item__header'>
          <h3 className='song-item__title'>{title}</h3>
          { isNew && <Label type='new' /> }
        </header>
        <div className='song-item__info'>
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <InfoText mod='author' value={authors[author]} />
            </div>
            <div className="col-xs-12 col-md-3">
              <InfoText mod='genre' value={genres[genre]} />
            </div>
            <div className="col-xs-12 col-md-3">
              <InfoText mod='time' value={lastDate} />
            </div>
          </div>
        </div>
        <Button className='song-item__button' mods={['add']} onClick={this.setSongActivity}>Добавить</Button>
      </article>
    );
  }
};

const mapStateToProps = state => ({
  genres: state.genres,
  authors: state.authors,
});

export default connect(mapStateToProps, { setSongActivity, addItem })(SongItem);
