import React from 'react';

// Styles //

// import './App.css';

// Components //

import SongList from '~/components/SongList/SongList';
import Navbar from '~/components/Navbar/Navbar';

const App = (props) => (
  <div className='app'>
    <header>
      <Navbar />
    </header>
    <div className='container'>
      <h2 className='title'>Список песен</h2>
      <SongList />
    </div>
  </div>
);

export default App;