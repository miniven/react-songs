import React from 'react';
import { connect } from 'react-redux';

// Styles //

import './List.css';

// Selectors //

import { getSelectedSongs } from '~/reducers/songReducer';

// Components //

import SongButton from '~/components/SongButton/SongButton';

const List = ({ className, data }) => {
  if (data.length === 0) {
    return <p className='text text--light text--small'>Ни одной песни не добавлено</p>
  }

  return (
    <ul className={`list ${className ? className : ''}`}>
      {
        data.map(item => (
          <li className='list__item' key={item.id}>
            <SongButton className='list__button' data={item} />
          </li>
        ))
      }
    </ul>
  );
};

const mapStateToProps = state => ({
  data: getSelectedSongs(state.songs),
});

export default connect(mapStateToProps, null)(List);