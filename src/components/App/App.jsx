import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// Components //

import SongListPage from '~/pages/SongListPage';
import NoMatchPage from '~/pages/NoMatchPage';
import HistoryPage from '~/pages/HistoryPage';
import Navbar from '~/components/Navbar/Navbar';

const App = (props) => (
  <Router>
    <div className='app'>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path='/' component={SongListPage} />
        <Route exact path='/history' component={HistoryPage} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  </Router>
);

export default App;