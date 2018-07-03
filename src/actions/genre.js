import { SET_GENRES } from '~/types/genre';

export const setGenres = data => ({
  type: SET_GENRES,
  data,
});