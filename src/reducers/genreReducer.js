import { SET_GENRES } from '~/types/genre';

export const genreReducer = (state = {}, { type, data }) => {
  switch (type) {
    case SET_GENRES:
      return data;
    default:
      return state;
  }
};