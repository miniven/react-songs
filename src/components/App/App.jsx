import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Media from "react-media";
import { connect } from 'react-redux';

// Constants //

import { MEDIA_MD } from '~/constants';

// Actions //

import { fetchSongs } from '~/actions/song';
import { fetchAuthors } from '~/actions/author';

// Components //

import SongListPage from '~/pages/SongListPage';
import NoMatchPage from '~/pages/NoMatchPage';
import HistoryPage from '~/pages/HistoryPage';
import SelectedSongsPage from '~/pages/SelectedSongsPage';
import Navbar from '~/components/Navbar/Navbar';

// Styles //

import './App.css';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchSongs();
    this.props.fetchAuthors();
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <header className='app__header'>
            <Navbar />
          </header>
          <Switch>
            <Route exact path='/' component={SongListPage} />
            <Route exact path='/history' component={HistoryPage} />
            <Route exact path='/selected' component={SelectedSongsPage} />
            <Media query={MEDIA_MD}>
              { matches => !matches && <Route component={NoMatchPage} /> }
            </Media>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default connect(null, { fetchSongs, fetchAuthors })(App);