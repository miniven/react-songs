import { OPEN_MODAL, CLOSE_MODAL, SET_ACTION_TYPE } from '~/types/ui';

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const setActionType = (action, id) => ({
  type: SET_ACTION_TYPE,
  action,
  id,
});