import React, { Component } from 'react';

// Components //

import SongButton from '~/components/SongButton/SongButton';

const SortableItem = SortableElement(({ item }) => (
  <li className='list__item'>
    <SongButton className='list__button' data={item} editable={true} />
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

const SortableSongList = ({ list, ...rest }) => (
  <SortableList
    items={list}
    lockAxis='y'
    helperClass='list__item--sortable'
    { ...rest }
  />
);

export default SortableSongList;