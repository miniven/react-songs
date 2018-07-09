import React, { Component } from 'react';
import { connect } from 'react-redux';

// Selectors //

import { getUnselectedSongs, getSortedSongs } from '~/reducers/songReducer';

// Components //

import StickyBox from 'react-sticky-box';
import FilterForm from '~/components/FilterForm/FilterForm';
import SongItem from '~/components/SongItem/SongItem';
import List from '~/components/List/List';
import Message from '~/components/Message/Message';
import Sidebar from '~/components/Sidebar/Sidebar';

// Styles //

import './SongList.css';

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
        <div className='col-xs-12'>
          <FilterForm handleInput={this.handleInput} values={this.state} />
        </div>
        <div className='col-xs-12 col-sm-8'>

          <div className='song-list'>
            {
              filteredList.length > 0 ? (
                <ul className='song-list__list'>{filteredList}</ul>
              ) : (
                <Message className='song-list__message' type='info' text='Ни одна песня не соответствует введенным параметрам' />
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
  data: getSortedSongs(getUnselectedSongs(state.songs), state.sorting),
});

export default connect(mapStateToProps)(SongList);
