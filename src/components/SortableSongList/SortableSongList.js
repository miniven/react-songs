import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

// Components //

import SongButton from '~/components/SongButton/SongButton';

const SortableItem = SortableElement(({ item, onRemoveItem }) => (
  <li className='list__item'>
    <SongButton className='list__button' data={item} onRemoveItem={onRemoveItem} editable={true} />
  </li>
));

const SortableList = SortableContainer(({ items, className, onRemoveItem }) => (
  <ul className={`list ${className}`}>
    {
      items.map((item, index) => (
        <SortableItem key={index} index={index} item={item} onRemoveItem={onRemoveItem} />
      ))
    }
  </ul>
));

const SortableSongList = ({ list, ...rest }) => (
  <SortableList
    items={list}
    lockAxis='y'
    helperClass='list__item--sortable'
    useDragHandle={true}
    { ...rest }
  />
);

export default SortableSongList;