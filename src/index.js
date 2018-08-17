import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Styles //

import 'reset-css';
import 'flexboxgrid';
import './styles/main.css';

// Components //

import App from '~/components/App/App';

// Redux //

import rootReducer from '~/reducers/';
import genres from '~/genres.json';
import { setGenres } from '~/actions/genre';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(setGenres(genres));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root')
);
