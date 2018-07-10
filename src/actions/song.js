import { SET_SONGS, SET_SONG_ACTIVITY, RESET_SONGS_ACTIVITY } from '~/types/song';

export const setSongs = data => ({
  type: SET_SONGS,
  data,
});

export const setSongActivity = (id, isSelected) => ({
  type: SET_SONG_ACTIVITY,
  id,
  isSelected,
});

export const resetSongsActivity = () => ({
  type: RESET_SONGS_ACTIVITY
});