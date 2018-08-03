import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

// Styles //

import './HistoryItem.css';

// Actions //

import { removeOrderFromList } from '~/actions/order';

class HistoryItem extends Component {
  componentWillMount = () => {
    moment().locale('ru');
  }

  findSong = (id) => {
    return this.props.songs.find(song => song.id === id);
  }

  renderSongList = (key) => this.props.history[key].map((id) => (
    <li className='history-item__list-item' key={id}>
      { this.findSong(id).title }
    </li>
  ));

  render() {
    const { date } = this.props;
    const momentDate = moment(date);

    return (
      <div className='history-item'>
        <div className="history-item__box">
          <button className='history-item__button history-item__button--edit' aria-label='Изменить'></button>
          <button className='history-item__button history-item__button--close' aria-label='Удалить' onClick={() => this.props.removeOrderFromList(date)}></button>
        </div>
        <div className='history-item__header'>
          <p className='history-item__date'>{ momentDate.format('DD.MM.YYYY') }</p>
          <p className='history-item__day'>{ momentDate.format('dddd') }</p>
        </div>
        <ul className='history-item__list'>{ this.renderSongList(date) }</ul>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  songs: state.songs,
  history: state.order.previous,
})

export default connect(mapStateToProps, { removeOrderFromList })(HistoryItem);
