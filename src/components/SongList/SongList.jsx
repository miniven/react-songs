import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongList.css';

// Selectors //

import { getUnselectedSongs } from '~/reducers/songReducer';

// Components //

import FilterForm from '~/components/FilterForm/FilterForm';
import SongItem from '~/components/SongItem/SongItem';

class SongList extends Component {
  state = {
    title: '',
    genre: 'all',
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  filterByTitle = (item) => {
    const currentTitle = item.title.toLowerCase();
    const neededTitle = this.state.title.toLowerCase();

    return currentTitle.indexOf(neededTitle) >= 0;
  }

  filterByGenre = (item) => this.state.genre === 'all' ? true : this.state.genre === item.genre;

  render() {
    const { data } = this.props;
    const filteredList = data
      .filter(this.filterByTitle)
      .filter(this.filterByGenre)
      .map(item => <li key={item.id} className='song-list__item'><SongItem data={item} /></li>);

    return (
      <Fragment>
        <FilterForm handleInput={this.handleInput} values={this.state} />

        <div className='song-list'>
          {
            filteredList.length > 0 ? (
              <ul className='song-list__list'>{filteredList}</ul>
            ) : (
              <p>Ни одной песни не найдено</p>
            )
          }
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  data: getUnselectedSongs(state.songs),
});

export default connect(mapStateToProps)(SongList);
