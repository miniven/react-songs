import React from 'react';

// Styles //

// import './App.css';

// Components //

import SongList from '~/components/SongList/SongList';

const App = (props) => (
  <div className='app'>
    <div className='container'>
      <h2 className='title'>Список песен</h2>
      <SongList />
    </div>
  </div>
);

export default App;