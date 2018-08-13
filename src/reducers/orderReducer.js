import {
  CHANGE_HISTORY_ITEM,
  ADD_ITEM_TO_SELECTED,
  REMOVE_ITEM_FROM_SELECTED,
  ADD_LIST_TO_HISTORY,
  REMOVE_LIST_FROM_HISTORY,
} from '~/types/order';

import { DELETE_SONG } from '~/types/song';

export const orderReducer = (state = { previous: {}, current: [] }, { type, id, oldIndex, newIndex, data, date }) => {
  switch (type) {
    case CHANGE_HISTORY_ITEM:
      return {
        ...state,
        previous: {
          ...state.previous,
          [id]: data,
        },
      };
    case ADD_ITEM_TO_SELECTED:
      return {
        ...state,
        current: [
          ...state.current,
          id,
        ],
      };
    case REMOVE_ITEM_FROM_SELECTED:
      return {
        ...state,
        current: state.current.filter(item => String(item) !== String(id)),
      };
    case ADD_LIST_TO_HISTORY:
      return {
        ...state,
        previous: {
          [id]: data,
          ...state.previous,
        },
        current: [],
      };
    case REMOVE_LIST_FROM_HISTORY:
      const { [id]: removedPrevious, ...restPrevious } = state.previous;

      return {
        ...state,
        previous: restPrevious,
      };
    case DELETE_SONG:
      // Сначала удаляем те списки, которые содержат удаляемую песню и длина которых равна 1
      // Затем проходим по всем спискам и удаляем песню
      const previous = Object.keys(state.previous)
        .filter(key => state.previous[key].includes(id) ? state.previous[key].length > 1 : true)
        .reduce((result, key) => {
          return {
            [key]: state.previous[key].filter(val => val !== id),
            ...result,
          };
        }, {});

      return {
        ...state,
        previous,
      };
    default:
      return state;
  }
};