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

export const INITIAL_STATE = { modal: { isModalOpen: false } };

export const uiReducer = (state = INITIAL_STATE, { type, action, id }) => {
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