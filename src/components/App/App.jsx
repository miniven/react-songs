import React from 'react';
import StickyBox from "react-sticky-box";

// Styles //

// import './App.css';

// Components //

import List from '~/components/List/List';
import Sidebar from '~/components/Sidebar/Sidebar';
import SongList from '~/components/SongList/SongList';

const App = (props) => (
  <div className='app'>
    <div className='container'>
      <div className='row'>
        <div className='col-xs'>
          <h2 className='title'>Список песен</h2>
          <SongList />
        </div>
        <div className='col-xs-12 col-sm-4 col-md-3'>
          <StickyBox bottom={false}>
            <Sidebar className='app__sidebar'>
              <h2 className='sidebar__title title'>Добавлены</h2>
              <List />
            </Sidebar>
          </StickyBox>
        </div>
      </div>
    </div>
  </div>
);

export default App;