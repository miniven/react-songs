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
          [id]: data,
          ...state.previous,
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
          [date]: arrayMove(state.previous[date], oldIndex, newIndex),
          ...state.previous,
        },
      };
    case REMOVE_ITEM_FROM_ORDER:
      // Удаляем элементы до тех пор, пока в списке не останется один элемент.
      const { [date]: changingPrev } = state.previous;

      return {
        ...state,
        previous: changingPrev.length > 1 ? {
          ...state.previous,
          [date]: changingPrev.filter(item => String(item) !== String(id)),
        } : state.previous,
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