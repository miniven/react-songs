import { SET_AUTHORS } from '~/types/author';

export const setAuthors = data => ({
  type: SET_AUTHORS,
  data,
});