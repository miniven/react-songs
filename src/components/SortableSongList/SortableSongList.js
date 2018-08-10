import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

// Components //

import SongButton from '~/components/SongButton/SongButton';

const SortableItem = SortableElement(({ item, historyID }) => (
  <li className='list__item'>
    <SongButton className='list__button' data={item} historyID={historyID} editable={true} />
  </li>
));

const SortableList = SortableContainer(({ items, className, historyID }) => (
  <ul className={`list ${className}`}>
    {
      items.map((item, index) => (
        <SortableItem key={index} index={index} item={item} historyID={historyID} />
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