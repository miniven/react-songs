import { SET_SONGS, RESET_SONGS_ACTIVITY, ADD_SONG, UPDATE_SONG, UPDATE_MULTIPLE_SONGS, DELETE_SONG } from '~/types/song';

const song = (state = {}, { type, data, chosenList, lastChosen }) => {
  switch (type) {
    case UPDATE_MULTIPLE_SONGS:
      return data[state.id] ? { ...state, ...data[state.id] } : state;
    case UPDATE_SONG:
      return { ...state, ...data };
    case RESET_SONGS_ACTIVITY:
      return chosenList.includes(state.id) ? { ...state, isSelected: false, lastChosen } : state;
    default:
      return state;
  }
};

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
        song(state[currentSongIndex], { type, data }),
        ...state.slice(currentSongIndex + 1),
      ];
    case UPDATE_MULTIPLE_SONGS:
      return state.map(item => song(item, { type, data }));
    case DELETE_SONG:
      currentSongIndex = state.findIndex(song => song.id === id);

      return [
        ...state.slice(0, currentSongIndex),
        ...state.slice(currentSongIndex + 1),
      ];
    case RESET_SONGS_ACTIVITY:
      return state.map(item => song(item, { type, chosenList, lastChosen }));
    default:
      return state;
  }
};
