import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

// Styles //

import './HistoryItem.css';

// Actions //

import { removeOrderFromList } from '~/actions/order';

// Components //

import SongButton from '~/components/SongButton/SongButton';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

class HistoryItem extends Component {
  state = {
    isEditing: false,
  }

  componentWillMount = () => {
    moment().locale('ru');
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  findSong = (id) => {
    return this.props.songs.find(song => song.id === id);
  }

  render() {
    const { date, history } = this.props;
    const { isEditing } = this.state;
    const momentDate = moment(date);

    return (
      <div className='history-item'>
        <div className="history-item__box">
          <button className='history-item__button history-item__button--edit' aria-label='Изменить' onClick={this.toggleEdit}></button>
          <button className='history-item__button history-item__button--close' aria-label='Удалить' onClick={() => this.props.removeOrderFromList(date)}></button>
        </div>
        <div className='history-item__header'>
          <p className='history-item__date'>{ momentDate.format('DD.MM.YYYY') }</p>
          <p className='history-item__day'>{ momentDate.format('dddd') }</p>
        </div>
        {
          isEditing ? (
            <SortableSongList list={history[date].map(id => this.findSong(id))} onSortEnd={() => console.log('hello')} />
          ) : (
            <ul className='history-item__list'>
              {
                history[date].map(id => (
                  <li className='history-item__list-item' key={id}>
                    <SongButton className='list__button' data={this.findSong(id)} />
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  songs: state.songs,
  history: state.order.previous,
})

export default connect(mapStateToProps, { removeOrderFromList })(HistoryItem);
