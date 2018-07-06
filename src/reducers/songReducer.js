import { SET_SONGS, SET_SONG_ACTIVITY } from '~/types/song';

export const songReducer = (state = [], { type, data, id, isSelected }) => {
  switch (type) {
    case SET_SONGS:
      return data;
    case SET_SONG_ACTIVITY:
      return state.map((item) => {
        if (item.id !== id) {
          return item;
        };

        return { ...item, isSelected };
      });
    default:
      return state;
  }
};

export const getOrderedSongs = (state, order) => {
  return order.map((id, index) => state.find(item => String(item.id) === String(id)));
}

export const getSelectedSongs = (state) => state.filter(item => item.isSelected);

export const getUnselectedSongs = (state) => state.filter(item => !item.isSelected);