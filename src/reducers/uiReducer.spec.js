import { uiReducer, INITIAL_STATE } from './uiReducer';
import { OPEN_MODAL, CLOSE_MODAL } from '~/types/ui';

describe('UI Reducer', () => {
  it('OPEN_MODAL', () => {
    expect(uiReducer(INITIAL_STATE, { type: OPEN_MODAL, action: 'delete', id: '1' })).toEqual({
      ...INITIAL_STATE,
      modal: {
        ...INITIAL_STATE.modal,
        isModalOpen: true,
        actionType: 'delete',
        targetID: '1',
      },
    });
  });

  it ('CLOSE_MODAL', () => {
    expect(uiReducer(INITIAL_STATE, { type: CLOSE_MODAL })).toEqual({
      ...INITIAL_STATE,
      modal: {
        ...INITIAL_STATE.modal,
        isModalOpen: false,
      },
    })
  });
});
