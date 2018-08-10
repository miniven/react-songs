import { OPEN_MODAL, CLOSE_MODAL } from '~/types/ui';

export const uiReducer = (state = { modal: { isModalOpen: false } }, { type, action, id }) => {
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isModalOpen: true,
          actionType: action,
          targetID: id,
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isModalOpen: false,
        }
      };
    default:
      return state;
  }
};