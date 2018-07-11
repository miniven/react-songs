import { SET_AUTHORS, ADD_AUTHOR } from '~/types/author';

export const setAuthors = data => ({
  type: SET_AUTHORS,
  data,
});

export const addAuthor = (id, name) => ({
  type: ADD_AUTHOR,
  id,
  name,
});