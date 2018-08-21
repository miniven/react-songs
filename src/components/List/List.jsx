import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { arrayMove } from 'react-sortable-hoc';
import DatePicker from 'react-datepicker';

// Styles //

import './List.css';

// Selectors //

import { getOrderedSongs } from '~/selectors/song';

// Actions //

import { removeItemFromSelected, addListToHistoryOnServer } from '~/actions/order';
import { updateSong, updateMultipleSongsOnServer, resetSongsActivity } from '~/actions/song';
import { openModal } from '~/actions/ui';

// Components //

import Message from '~/components/Message/Message';
import Button from '~/components/Button/Button';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

class List extends PureComponent {
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
      list: this.state.list.filter(item => item._id !== id),
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

    const date = this.state.date.toISOString();
    const list = this.state.list.map(item => item._id);

    // Изменяем дату последнего исполнения песен списка
    const dataToUpdate = this.state.list.reduce((result, song) => {
      return {
        ...result,
        [song._id]: { lastChosen: date },
      };
    }, {});

    this.props.addListToHistoryOnServer({ date, list });
    this.props.updateMultipleSongsOnServer(dataToUpdate);
    this.props.resetSongsActivity(list);
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
  orderedData: getOrderedSongs(state),
  order: state.order.current,
});

export default connect(mapStateToProps, { removeItemFromSelected, addListToHistoryOnServer, updateSong, updateMultipleSongsOnServer, resetSongsActivity, openModal })(List);

