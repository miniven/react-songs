import API from '~/api/';

import {
  SET_HISTORY,
  CHANGE_HISTORY_ITEM,
  ADD_ITEM_TO_SELECTED,
  REMOVE_ITEM_FROM_SELECTED,
  ADD_LIST_TO_HISTORY,
  REMOVE_LIST_FROM_HISTORY,
} from '~/types/order';

export const setHistory = data => ({
  type: SET_HISTORY,
  data,
});

export const fetchHistory = () => dispatch => {
  return API.history
    .fetch()
    .then((data) => {
      // Данные поступают в виде массива объектов, а должны быть объектом
      const preparedData = data.reduce((result, item) => {
        const { _id, ...restData } = item;

        return {
          ...result,
          [item._id]: restData,
        };
      }, {});

      dispatch(setHistory(preparedData));
    })
    .catch(err => console.log(err));
};

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

export const addListToHistory = (id, data) => ({
  type: ADD_LIST_TO_HISTORY,
  id,
  data,
});

export const addListToHistoryOnServer = data => dispatch => {
  return API.history
    .create(data)
    .then((resData) => {
      const { _id, ...restData } = resData;

      dispatch(addListToHistory(_id, restData));
    })
    .catch(err => console.log(err));
};

export const removeListFromHistory = id => ({
  type: REMOVE_LIST_FROM_HISTORY,
  id,
});

export const removeListFromHistoryOnServer = id => dispatch => {
  return API.history
    .delete(id)
    .then(() => dispatch(removeListFromHistory(id)))
    .catch(err => console.log(err));
};

