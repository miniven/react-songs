import { OPEN_MODAL, CLOSE_MODAL } from '~/types/ui';

const modal = (state, { type, action, id }) => {
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        actionType: action,
        targetID: id,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};

export const uiReducer = (state = { modal: { isModalOpen: false } }, { type, action, id }) => {
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: modal(state.modal, { type, action, id }),
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: modal(state.modal, { type }),
      };
    default:
      return state;
  }
};