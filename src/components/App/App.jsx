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
import { fetchHistory } from '~/actions/order';

// Components //

import SongListPage from '~/pages/SongListPage';
import NoMatchPage from '~/pages/NoMatchPage';
import HistoryPage from '~/pages/HistoryPage';
import CreateSongPage from '~/pages/CreateSongPage';
import SelectedSongsPage from '~/pages/SelectedSongsPage';
import Navbar from '~/components/Navbar/Navbar';

// Styles //

import './App.css';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchSongs();
    this.props.fetchAuthors();
    this.props.fetchHistory();
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
            <Route exact path='/create' component={CreateSongPage} />
            <Media query={MEDIA_MD}>
              { matches => !matches && <Route component={NoMatchPage} /> }
            </Media>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default connect(null, { fetchSongs, fetchAuthors, fetchHistory })(App);