import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles //

import './SongList.css';

// Selectors //

import { getUnselectedSongs } from '~/reducers/songReducer';

// Components //

import StickyBox from 'react-sticky-box';
import FilterForm from '~/components/FilterForm/FilterForm';
import SongItem from '~/components/SongItem/SongItem';
import Sidebar from '~/components/Sidebar/Sidebar';
import List from '~/components/List/List';

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
      <div className='row'>
        <div className='col-xs-12 col-sm-8'>
          <FilterForm handleInput={this.handleInput} values={this.state} />
        </div>
        <div className='col-xs-12 col-sm-8'>

          <div className='song-list'>
            {
              filteredList.length > 0 ? (
                <ul className='song-list__list'>{filteredList}</ul>
              ) : (
                <p>Ни одной песни не найдено</p>
              )
            }
          </div>
        </div>
        <div className='col-xs'>
          <StickyBox bottom={false}>
            <Sidebar>
              <List />
            </Sidebar>
          </StickyBox>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  data: getUnselectedSongs(state.songs),
});

export default connect(mapStateToProps)(SongList);
