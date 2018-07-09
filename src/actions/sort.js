import { SET_SORTING } from '~/types/sort';

export const setSorting = name => ({
  type: SET_SORTING,
  name,
});