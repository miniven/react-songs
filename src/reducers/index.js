import { combineReducers } from 'redux';
import { songReducer } from './songReducer';
import { genreReducer } from './genreReducer';
import { authorReducer } from './authorReducer';
import { orderReducer } from './orderReducer';
import { sortReducer } from './sortReducer';

const rootReducer = combineReducers({
  songs: songReducer,
  genres: genreReducer,
  authors: authorReducer,
  order: orderReducer,
  sorting: sortReducer,
});

export default rootReducer;