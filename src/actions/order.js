import { CHANGE_ORDER, ADD_ITEM, REMOVE_ITEM } from '~/types/order';

export const changeOrder = (oldIndex, newIndex) => ({
  type: CHANGE_ORDER,
  oldIndex,
  newIndex,
});

export const addItem = (id) => ({
  type: ADD_ITEM,
  id,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
});