import { SET_SONGS } from '~/types/song';

export const setSongs = data => ({
  type: SET_SONGS,
  data,
});