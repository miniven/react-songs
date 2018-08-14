import {
  CHANGE_HISTORY_ITEM,
  ADD_ITEM_TO_SELECTED,
  REMOVE_ITEM_FROM_SELECTED,
  ADD_LIST_TO_HISTORY,
  REMOVE_LIST_FROM_HISTORY,
} from '~/types/order';

export const changeHistoryItem = (id, data) => ({
  type: CHANGE_HISTORY_ITEM,
  id,
  data,
});

export const addItemToSelected = (id) => ({
  type: ADD_ITEM_TO_SELECTED,
  id,
});

export const removeItemFromSelected = (id) => ({
  type: REMOVE_ITEM_FROM_SELECTED,
  id,
});

export const addListToHistory = (id, date, data) => ({
  type: ADD_LIST_TO_HISTORY,
  id,
  date,
  data,
})

export const removeListFromHistory = (id) => ({
  type: REMOVE_LIST_FROM_HISTORY,
  id,
});