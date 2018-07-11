import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import moment from 'moment';

// Styles //

import './List.css';

// Selectors //

import { getOrderedSongs } from '~/reducers/songReducer';

// Actions //

import { changeOrder, addOrderToList } from '~/actions/order';
import { resetSongsActivity } from '~/actions/song';

// Components //

import SongButton from '~/components/SongButton/SongButton';
import Message from '~/components/Message/Message';
import Button from '~/components/Button/Button';

const SortableItem = SortableElement(({ item }) => (
  <li className='list__item'>
    <SongButton className='list__button' data={item} />
  </li>
));

const SortableList = SortableContainer(({ items, className }) => (
  <ul className={`list ${className}`}>
    {
      items.map((item, index) => (
        <SortableItem key={index} index={index} item={item} />
      ))
    }
  </ul>
));

class List extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.changeOrder(oldIndex, newIndex);
  }

  saveList = () => {
    this.props.addOrderToList(moment().toISOString(), this.props.order);
    this.props.resetSongsActivity();
    this.props.addButtonCallback();
  }

  render() {
    const { className, orderedData } = this.props;

    if (orderedData.length === 0) {
      return <Message className='sidebar__message' type='info' text='Ни одной песни пока не добавлено' />
    }

    return (
      <Fragment>
        <SortableList
          items={orderedData}
          lockAxis='y'
          className={className ? className : ''}
          helperClass='list__item--sortable'
          onSortEnd={this.onSortEnd}
        />
        <Button className='sidebar__button' mods={['green']} onClick={this.saveList}>Сохранить</Button>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  orderedData: getOrderedSongs(state.songs, state.order.current),
  order: state.order.current,
});

export default connect(mapStateToProps, { changeOrder, addOrderToList, resetSongsActivity })(List);