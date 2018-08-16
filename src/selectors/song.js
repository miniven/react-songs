import { createSelector } from 'reselect';
import { DB_SONG_KEYS } from '~/constants';

export const getSelectedSongs = createSelector(
  [
    state => state.songs,
  ],
  songs => songs.filter(item => item.isSelected)
);

export const getUnselectedSongs = createSelector(
  [
    state => state.songs,
  ],
  songs => songs.filter(item => !item.isSelected)
);

export const getOrderedSongs = createSelector(
  [
    getSelectedSongs,
    state => state.order.current,
  ],
  (songs, order) => {
    return order.map((id, index) => songs.find(item => String(item.id) === String(id)));
  }
);

export const getSortedSongs = createSelector(
  [
    getUnselectedSongs,
    state => state.sorting,
  ],
  (songs, sorting) => {
    const KEY = DB_SONG_KEYS[sorting];

    switch (sorting) {
      case 'CREATED':
        return [...songs].sort((prev, current) => {
          return prev[KEY] < current[KEY] ? 1 : -1;
        });
      default:
        return [...songs].sort((prev, current) => {
        return prev[KEY] > current[KEY] ? 1 : -1;
      });
    }
  }
);

export const getSelectedAmount = state => getSelectedSongs(state).length;
