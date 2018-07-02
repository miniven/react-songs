import { SET_SONGS } from '~/types/song';

export const songReducer = (state = {}, { type, data }) => {
  switch (type) {
    case SET_SONGS:
      return data;
    default:
      return state;
  }
};