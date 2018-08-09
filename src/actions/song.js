import { SET_SONGS, SET_SONG_ACTIVITY, RESET_SONGS_ACTIVITY, ADD_SONG, UPDATE_SONG, DELETE_SONG } from '~/types/song';

export const setSongs = data => ({
  type: SET_SONGS,
  data,
});

export const setSongActivity = (id, isSelected) => ({
  type: SET_SONG_ACTIVITY,
  id,
  isSelected,
});

export const resetSongsActivity = (lastChosen, chosenList) => ({
  type: RESET_SONGS_ACTIVITY,
  lastChosen,
  chosenList,
});

export const addSong = (data) => ({
  type: ADD_SONG,
  data,
});

export const updateSong = (id, data) => ({
  type: UPDATE_SONG,
  id,
  data,
});

export const deleteSong = id => ({
  type: DELETE_SONG,
  id,
});