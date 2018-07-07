import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

// Styles //

import './List.css';

// Selectors //

import { getOrderedSongs } from '~/reducers/songReducer';

// Actions //

import { changeOrder } from '~/actions/order';

// Components //

import SongButton from '~/components/SongButton/SongButton';
import Message from '~/components/Message/Message';

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

  render() {
    const { className, orderedData } = this.props;

    if (orderedData.length === 0) {
      return <Message className='sidebar__message' type='info' text='Ни одной песни не добавлено' />
    }

    return (
      <SortableList
        items={orderedData}
        lockAxis='y'
        className={className ? className : ''}
        helperClass='list__item--sortable'
        onSortEnd={this.onSortEnd}
      />
    );
  }
};

const mapStateToProps = state => ({
  orderedData: getOrderedSongs(state.songs, state.order),
});

export default connect(mapStateToProps, { changeOrder })(List);