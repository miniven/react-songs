import { CHANGE_ORDER, ADD_ITEM, REMOVE_ITEM, ADD_ORDER_TO_LIST } from '~/types/order';

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

export const addOrderToList = (id, data) => ({
  type: ADD_ORDER_TO_LIST,
  id,
  data,
})