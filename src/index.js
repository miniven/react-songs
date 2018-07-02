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

import rootReducer from '~/reducers/';
import { setSongs } from '~/actions/song';

const store = createStore(rootReducer);

store.dispatch(setSongs({
  1: 'Someone Like You',
  2: 'Plenty',
  3: 'The Smallest Bones',
  4: 'Semantics',
  5: 'Carl',
  6: 'Playground',
  7: 'Tongues',
  8: 'Rilke Song',
  9: 'The Flood',
  10: 'Any Body',
  11: 'Bloodlust',
  12: 'Mahogany',
  13: 'Two Knocks',
  14: 'Riverside',
  15: 'Blend',
  16: 'Too Close',
  17: 'Breezeblocks',
  18: 'Fake Palindromes',
  19: 'Fox in the Snow',
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root')
);
