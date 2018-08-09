import {
  CHANGE_ORDER,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_ORDER_TO_LIST,
  REMOVE_ORDER_FROM_LIST,
  CHANGE_HISTORY_ORDER,
  REMOVE_ITEM_FROM_ORDER
} from '~/types/order';

export const changeOrder = (oldIndex, newIndex) => ({
  type: CHANGE_ORDER,
  oldIndex,
  newIndex,
});

export const changeHistoryOrder = (date, oldIndex, newIndex) => ({
  type: CHANGE_HISTORY_ORDER,
  oldIndex,
  newIndex,
  date,
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

export const removeOrderFromList = (id) => ({
  type: REMOVE_ORDER_FROM_LIST,
  id,
});

export const removeItemFromOrder = (date, id) => ({
  type: REMOVE_ITEM_FROM_ORDER,
  date,
  id,
})