import { CHANGE_ORDER, ADD_ITEM, REMOVE_ITEM } from '~/types/order';
import { arrayMove } from 'react-sortable-hoc';

export const orderReducer = (state = [], { type, id, oldIndex, newIndex }) => {
  switch (type) {
    case CHANGE_ORDER:
      return arrayMove(state, oldIndex, newIndex);
    case ADD_ITEM:
      return [
        ...state,
        id,
      ];
    case REMOVE_ITEM:
      return state.filter(item => String(item) !== String(id));
    default:
      return state;
  }
};