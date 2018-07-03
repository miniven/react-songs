import React from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongList.css';

// Selectors //

import { getUnselectedSongs } from '~/reducers/songReducer';

// Components //

import SongItem from '~/components/SongItem/SongItem';

const SongList = ({ data }) => (
  <ul className='song-list'>
    {
      data.map(item => (
        <li key={item.id} className='song-list__item'><SongItem data={item} /></li>
      ))
    }
  </ul>
);

const mapStateToProps = state => ({
  data: getUnselectedSongs(state.songs),
});

export default connect(mapStateToProps)(SongList);
