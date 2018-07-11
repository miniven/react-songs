import { SET_AUTHORS, ADD_AUTHOR } from '~/types/author';

export const authorReducer = (state = {}, { type, data, id, name }) => {
  switch (type) {
    case SET_AUTHORS:
      return data;
    case ADD_AUTHOR:
      return {
        ...state,
        [id]: name,
      };
    default:
      return state;
  }
};