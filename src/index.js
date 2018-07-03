import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Styles //

import 'reset-css';
import 'flexboxgrid';
import './styles/main.css';

// Components //

import App from '~/components/App/App';

// Redux //

import songs from '~/songs.json';
import rootReducer from '~/reducers/';
import { setSongs } from '~/actions/song';

const store = createStore(rootReducer);

store.dispatch(setSongs(songs));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root')
);
