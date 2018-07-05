import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

// Styles //

import './List.css';

// Selectors //

import { getSelectedSongs } from '~/reducers/songReducer';
import { changeOrder } from '~/actions/order';

// Components //

import SongButton from '~/components/SongButton/SongButton';
import Message from '~/components/Message/Message';

const SortableItem = SortableElement(({ item }) => (
  <li className='list__item'>
    <SongButton className='list__button' data={item} />
  </li>
));

const SortableList = SortableContainer(({ order, items, className }) => (
  <ul className={`list ${className}`}>
    {
      order.map((id, index) => (
        <SortableItem key={index} index={index} item={items.find(item => String(item.id) === String(id))} />
      ))
    }
  </ul>
));

class List extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.changeOrder(oldIndex, newIndex);
  }

  render() {
    const { className, data, order } = this.props;

    if (data.length === 0) {
      return <Message className='sidebar__message' type='info' text='Ни одной песни не добавлено' />
    }

    return <SortableList order={order} items={data} className={className ? className : ''} helperClass='list__item--sortable' onSortEnd={this.onSortEnd} />;
  }
};

const mapStateToProps = state => ({
  data: getSelectedSongs(state.songs),
  order: state.order,
});

export default connect(mapStateToProps, { changeOrder })(List);