import { CHANGE_ORDER, ADD_ITEM, REMOVE_ITEM, ADD_ORDER_TO_LIST, REMOVE_ORDER_FROM_LIST } from '~/types/order';
import { arrayMove } from 'react-sortable-hoc';

export const orderReducer = (state = { previous: {}, current: [] }, { type, id, oldIndex, newIndex, data }) => {
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
    default:
      return state;
  }
};