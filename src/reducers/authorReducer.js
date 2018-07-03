import { SET_AUTHORS } from '~/types/author';

export const authorReducer = (state = {}, { type, data }) => {
  switch (type) {
    case SET_AUTHORS:
      return data;
    default:
      return state;
  }
};