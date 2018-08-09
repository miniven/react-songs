import { OPEN_MODAL, CLOSE_MODAL } from '~/types/ui';

export const openModal = (action, id) => ({
  type: OPEN_MODAL,
  action,
  id,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});