import React from 'react';
import { connect } from 'react-redux';

// Styles //

import './List.css';

// Selectors //

import { getSelectedSongs } from '~/reducers/songReducer';

// Components //

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
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
        <SortableItem key={item.id} index={index} item={item} />
      ))
    }
  </ul>
));

const List = ({ className, data }) => {
  if (data.length === 0) {
    return <Message className='sidebar__message' type='info' text='Ни одной песни не добавлено' />
  }

  return <SortableList items={data} className={className ? className : ''} />;
};

const mapStateToProps = state => ({
  data: getSelectedSongs(state.songs),
});

export default connect(mapStateToProps, null)(List);