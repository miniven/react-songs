import { SET_SORTING } from '~/types/sort';

export const sortReducer = (state = 'CREATED', { type, name }) => {
  switch (type) {
    case SET_SORTING:
      return name;
    default:
      return state;
  }
};