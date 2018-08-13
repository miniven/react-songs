import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { arrayMove } from 'react-sortable-hoc';

// Styles //

import './HistoryItem.css';

// Actions //

import { updateMultipleSongs } from '~/actions/song';
import { removeOrderFromList, changeHistoryOrder } from '~/actions/order';
import { openModal } from '~/actions/ui';

// Components //

import Button from '~/components/Button/Button';
import SongButton from '~/components/SongButton/SongButton';
import IconButton from '~/components/IconButton/IconButton';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

moment().locale('ru');

class HistoryItem extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState;
  }

  state = {
    isEditing: false,
    removedFromList: [],
    list: this.props.history[this.props.date],
  }

  toggleEdit = () => {
    this.setState({
      removedFromList: [],
      isEditing: !this.state.isEditing,
    });
  }

  saveChanges = () => {
    const { list, removedFromList } = this.state;
    const { changeHistoryOrder, removeOrderFromList, updateMultipleSongs, date } = this.props;
    const { [date]: current, ...restHistory } = this.props.history; // Все списки, кроме текущего

    if (list.length > 0) {
      changeHistoryOrder(date, list);
    } else {
      removeOrderFromList(date);
    }

    const dataToUpdate = removedFromList.reduce((result, songID) => ({
      ...result,
      [songID]: { lastChosen: Object.keys(restHistory).find(key => restHistory[key].includes(songID)) },
    }), {});

    updateMultipleSongs(dataToUpdate);

    this.toggleEdit();
  }

  resetChanges = () => {
    this.setState({
      removedFromList: [],
      list: this.props.history[this.props.date],
    });
    this.toggleEdit();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      list: arrayMove(this.state.list, oldIndex, newIndex),
    });
  }
  
  onRemoveItem = id => {
    this.setState({
      removedFromList: [...this.state.removedFromList, id],
      list: this.state.list.filter(item => item !== id),
    });
  }

  findSong = (id) => {
    return this.props.songs.find(song => song.id === id);
  }

  showDeleteConfirm = () => {
    this.props.openModal('deleteOrder', this.props.date);
  }

  render() {
    const { date, history } = this.props;
    const { isEditing } = this.state;
    const momentDate = moment(date);

    return (
      <div className='history-item'>
        <div className='history-item__box'>
          { !isEditing && <IconButton className='history-item__icon' onClick={this.toggleEdit} type='edit' /> }
          <IconButton className='history-item__icon' onClick={this.showDeleteConfirm} type='delete' />
        </div>
        <div className='history-item__header'>
          <p className='history-item__date'>{ momentDate.format('DD.MM.YYYY') }</p>
          <p className='history-item__day'>{ momentDate.format('dddd') }</p>
        </div>
        {
          isEditing ? (
            <Fragment>
              <SortableSongList className='history-item__list' list={this.state.list.map(this.findSong)} onSortEnd={this.onSortEnd} onRemoveItem={this.onRemoveItem} />
              <div className='history-item__footer'>
                <Button className='history-item__button' mods={['green', 'short']} onClick={this.saveChanges}>Сохранить</Button>
                <Button className='history-item__button' mods={['gray', 'short']} onClick={this.resetChanges}>Отменить</Button>
              </div>
            </Fragment>
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

export default connect(mapStateToProps, { updateMultipleSongs, removeOrderFromList, changeHistoryOrder, openModal })(HistoryItem);
