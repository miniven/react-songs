import {
  SET_HISTORY,
  CHANGE_HISTORY_ITEM,
  ADD_ITEM_TO_SELECTED,
  REMOVE_ITEM_FROM_SELECTED,
  ADD_LIST_TO_HISTORY,
  REMOVE_LIST_FROM_HISTORY,
} from '~/types/order';

import { DELETE_SONG } from '~/types/song';

const previousOrders = (state = {}, { type, id, date, data }) => {
  switch (type) {
    case SET_HISTORY:
      return data;
    case CHANGE_HISTORY_ITEM:
      return {
        ...state,
        [id]: {
          ...state[id],
          list: data,
        },
      };
    case ADD_LIST_TO_HISTORY:
      return {
        ...state,
        [id]: data,
      };
    case REMOVE_LIST_FROM_HISTORY:
      const { [id]: removedPrevious, ...restPrevious } = state;

      return restPrevious;
    case DELETE_SONG:
      // Сначала удаляем те списки, которые содержат удаляемую песню и длина которых равна 1
      // Затем проходим по всем спискам и удаляем песню
      return Object.keys(state)
        .filter(key => state[key].list.includes(id) ? state[key].list.length > 1 : true)
        .reduce((result, key) => {
          return {
            [key]: {
              ...state[key],
              list: state[key].list.filter(val => val !== id),
            },
            ...result,
          };
        }, {});
    default:
      return state;
  }
};

const currentOrder = (state = [], { type, id }) => {
  switch (type) {
    case ADD_ITEM_TO_SELECTED:
      return [
        ...state,
        id,
      ];
    case REMOVE_ITEM_FROM_SELECTED:
      return state.filter(item => item !== id);
    default:
      return state;
  }
};

export const orderReducer = (state = { previous: {}, current: [] }, { type, id, data, date }) => {
  switch (type) {
    case SET_HISTORY:
      return {
        ...state,
        previous: previousOrders(state.previou, { type, data }),
      };
    case CHANGE_HISTORY_ITEM:
      return {
        ...state,
        previous: previousOrders(state.previous, { type, id, data }),
      };
    case ADD_ITEM_TO_SELECTED:
      return {
        ...state,
        current: currentOrder(state.current, { type, id }),
      };
    case REMOVE_ITEM_FROM_SELECTED:
      return {
        ...state,
        current: currentOrder(state.current, { type, id }),
      };
    case ADD_LIST_TO_HISTORY:
      return {
        ...state,
        previous: previousOrders(state.previous, { type, id, data }),
        current: [],
      };
    case REMOVE_LIST_FROM_HISTORY:
      return {
        ...state,
        previous: previousOrders(state.previous, { type, id }),
      };
    case DELETE_SONG:
      return {
        ...state,
        previous: previousOrders(state.previous, { type, id }),
      };
    default:
      return state;
  }
};