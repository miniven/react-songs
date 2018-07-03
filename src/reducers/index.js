import { combineReducers } from 'redux';
import { songReducer } from './songReducer';
import { genreReducer } from './genreReducer';
import { authorReducer } from './authorReducer';

const rootReducer = combineReducers({
  songs: songReducer,
  genres: genreReducer,
  authors: authorReducer,
});

export default rootReducer;