import {
  CHANGE_ORDER,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_ORDER_TO_LIST,
  REMOVE_ORDER_FROM_LIST,
  CHANGE_HISTORY_ORDER,
  REMOVE_ITEM_FROM_ORDER
} from '~/types/order';
import { DELETE_SONG } from '~/types/song';
import { arrayMove } from 'react-sortable-hoc';

export const orderReducer = (state = { previous: {}, current: [] }, { type, id, oldIndex, newIndex, data, date }) => {
  switch (type) {
    case CHANGE_ORDER:
      return { ...state, current: arrayMove(state.current, oldIndex, newIndex) };
    case ADD_ITEM:
      return {
        ...state,
        current: [
          ...state.current,
          id,
        ],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        current: state.current.filter(item => String(item) !== String(id)),
      };
    case ADD_ORDER_TO_LIST:
      return {
        ...state,
        previous: {
          ...state.previous,
          [id]: data,
        },
        current: [],
      };
    case REMOVE_ORDER_FROM_LIST:
      const { [id]: removedPrevious, ...restPrevious } = state.previous;

      return {
        ...state,
        previous: restPrevious,
      };
    case CHANGE_HISTORY_ORDER:
      return {
        ...state,
        previous: {
          ...state.previous,
          [date]: arrayMove(state.previous[date], oldIndex, newIndex),
        },
      };
    case REMOVE_ITEM_FROM_ORDER:
      return {
        ...state,
        previous: {
          ...state.previous,
          [date]: state.previous[date].filter(item => String(item) !== String(id)),
        }
      };
    case DELETE_SONG:
      const previous = Object.keys(state.previous).reduce((result, key) => {
        return {
          ...result,
          [key]: state.previous[key].filter(val => val !== id),
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