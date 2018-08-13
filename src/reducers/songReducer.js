import { SET_SONGS, RESET_SONGS_ACTIVITY, ADD_SONG, UPDATE_SONG, UPDATE_MULTIPLE_SONGS, DELETE_SONG } from '~/types/song';
import { DB_SONG_KEYS } from '~/constants';

export const songReducer = (state = [], { type, data, id, isSelected, lastChosen, chosenList }) => {
  let currentSongIndex;

  switch (type) {
    case SET_SONGS:
      return data;
    case ADD_SONG:
      return [
        ...state,
        data,
      ];
    case UPDATE_SONG:
      currentSongIndex = state.findIndex(song => song.id === id);

      return [
        ...state.slice(0, currentSongIndex),
        { ...state[currentSongIndex], ...data },
        ...state.slice(currentSongIndex + 1),
      ];
    case UPDATE_MULTIPLE_SONGS:
      return state.map((song) => (
        data[song.id] ? { ...song, ...data[song.id] } : song
      ));
    case DELETE_SONG:
      currentSongIndex = state.findIndex(song => song.id === id);

      return [
        ...state.slice(0, currentSongIndex),
        ...state.slice(currentSongIndex + 1),
      ];
    case RESET_SONGS_ACTIVITY:
      return state.map((item) => chosenList.includes(item.id) ? { ...item, isSelected: false, lastChosen } : item);
    default:
      return state;
  }
};

export const getOrderedSongs = (state, order) => {
  const songs = getSelectedSongs(state);

  return order.map((id, index) => songs.find(item => String(item.id) === String(id)));
};

export const getSortedSongs = (state, sorting) => {
  const KEY = DB_SONG_KEYS[sorting];

  switch (sorting) {
    case 'CREATED':
      return [...state].sort((prev, current) => {
        return prev[KEY] < current[KEY] ? 1 : -1;
      });
    default:
      return [...state].sort((prev, current) => {
      return prev[KEY] > current[KEY] ? 1 : -1;
    });
  }
};

export const getSelectedSongs = (state) => state.filter(item => item.isSelected);

export const getUnselectedSongs = (state) => state.filter(item => !item.isSelected);

export const getSelectedAmount = (state) => getSelectedSongs(state).length;
