import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Styles //

import 'reset-css';
import 'flexboxgrid';
import './styles/main.css';

// Components //

import App from '~/components/App/App';

// Redux //

import rootReducer from '~/reducers/';
import songs from '~/songs.json';
import genres from '~/genres.json';
import authors from '~/authors.json';
import { setSongs } from '~/actions/song';
import { setGenres } from '~/actions/genre';
import { setAuthors } from '~/actions/author';

const store = createStore(rootReducer, composeWithDevTools());

store.dispatch(setSongs(songs));
store.dispatch(setGenres(genres));
store.dispatch(setAuthors(authors));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root')
);
