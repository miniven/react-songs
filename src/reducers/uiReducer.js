import { OPEN_MODAL, CLOSE_MODAL, SET_ACTION_TYPE } from '~/types/ui';

export const uiReducer = (state = { modal: { isModalOpen: false } }, { type, action, id }) => {
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isModalOpen: true,
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
    case SET_ACTION_TYPE:
      return {
        ...state,
        modal: {
          isModalOpen: true,
          actionType: action,
          selectedSong: id,
        }
      };
    default:
      return state;
  }
};