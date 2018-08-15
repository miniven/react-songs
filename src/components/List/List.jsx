import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import short from 'short-uuid';
import { arrayMove } from 'react-sortable-hoc';
import DatePicker from 'react-datepicker';

// Styles //

import './List.css';

// Selectors //

import { getOrderedSongs } from '~/reducers/songReducer';

// Actions //

import { removeItemFromSelected, addListToHistory } from '~/actions/order';
import { updateSong, resetSongsActivity } from '~/actions/song';
import { openModal } from '~/actions/ui';

// Components //

import Message from '~/components/Message/Message';
import Button from '~/components/Button/Button';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

class List extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const lastAdded = nextProps.orderedData[nextProps.orderedData.length - 1];
    const shouldLastBeAdded = nextProps.orderedData.length > prevState.list.length;

    return {
      list: shouldLastBeAdded ? [...prevState.list, lastAdded] : prevState.list,
    }
  }

  state = {
    date: moment(),
    list: this.props.orderedData,
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      list: arrayMove(this.state.list, oldIndex, newIndex),
    });
  }

  onRemoveItem = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id),
    });

    this.props.updateSong(id, { isSelected: false });
    this.props.removeItemFromSelected(id);
  }

  setDate = date => {
    this.setState({
      date,
    });
  }

  saveList = (event) => {
    event.preventDefault();

    const translator = short();
    const date = this.state.date.toISOString();
    const order = this.state.list.map(item => item.id);

    this.props.addListToHistory(translator.new(), date, order);
    this.props.resetSongsActivity(date, order);
    this.props.openModal('showSuccess');
  }

  render() {
    const { className, orderedData } = this.props;

    if (orderedData.length === 0) {
      return <Message className='sidebar__message' type='info' text='Ни одной песни пока не добавлено' />
    }

    return (
      <form className='form' onSubmit={this.saveList}>
        <label className='form__field'>
          <p className='form__label'>Дата</p>
          <DatePicker
            className='form__input'
            selected={this.state.date}
            onChange={this.setDate}
          />
        </label>
        <SortableSongList list={this.state.list} onSortEnd={this.onSortEnd} onRemoveItem={this.onRemoveItem} className={className ? className : ''} />
        <Button type='submit' className='sidebar__button' mods={['green', 'block']}>Сохранить</Button>
      </form>
    );
  }
};

const mapStateToProps = state => ({
  orderedData: getOrderedSongs(state.songs, state.order.current),
  order: state.order.current,
});

export default connect(mapStateToProps, { removeItemFromSelected, addListToHistory, updateSong, resetSongsActivity, openModal })(List);