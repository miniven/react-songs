import API from '~/api/';
import { SET_SONGS, RESET_SONGS_ACTIVITY, ADD_SONG, UPDATE_SONG, UPDATE_MULTIPLE_SONGS, DELETE_SONG } from '~/types/song';

export const setSongs = data => ({
  type: SET_SONGS,
  data,
});

export const fetchSongs = () => dispatch => {
  return API.songs
    .fetch()
    .then(data => dispatch(setSongs(data)))
    .catch(err => console.log(err));
};

export const addSongOnServer = data => dispatch => {
  return API.songs
    .create(data)
    .then(resData => dispatch(addSong(resData)))
    .catch(err => console.log(err));
};

export const addSong = (data) => ({
  type: ADD_SONG,
  data,
});

export const resetSongsActivity = (lastChosen, chosenList) => ({
  type: RESET_SONGS_ACTIVITY,
  lastChosen,
  chosenList,
});

export const updateSong = data => ({
  type: UPDATE_SONG,
  data,
});

export const updateSongOnServer = (data) => dispatch => {
  return API.songs
    .update(data)
    .then(() => dispatch(updateSong(data)))
    .catch(err => console.log(err));
};

export const updateMultipleSongs = data => ({
  type: UPDATE_MULTIPLE_SONGS,
  data,
});

export const updateMultipleSongsOnServer = data => dispatch => {
  console.log(data);
  // return API.songs
  //   .updateMultiple(data)
  //   .then(() => dispatch(updateMultipleSongs))
  //   .catch(err => console.log(err));
};

export const deleteSongOnServer = id => dispatch => {
  return API.songs
    .delete(id)
    .then(data => dispatch(deleteSong(id)))
    .catch(err => console.log(err));
};

export const deleteSong = id => ({
  type: DELETE_SONG,
  id,
});