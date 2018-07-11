import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Selectors //

import { getUnselectedSongs, getSortedSongs } from '~/reducers/songReducer';

// Components //

import StickyBox from 'react-sticky-box';
import Modal from 'react-responsive-modal';
import FilterForm from '~/components/FilterForm/FilterForm';
import SongItem from '~/components/SongItem/SongItem';
import List from '~/components/List/List';
import Message from '~/components/Message/Message';
import Sidebar from '~/components/Sidebar/Sidebar';
import Button from '~/components/Button/Button';

// Styles //

import './SongList.css';

class SongList extends Component {
  state = {
    filter: {
      title: '',
      genre: 'all',
    },
    isModalOpen: false,
  }

  handleInput = ({ target }) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [target.name]: target.value
      },
    });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  filterByTitle = (item) => {
    const currentTitle = item.title.toLowerCase();
    const neededTitle = this.state.filter.title.toLowerCase();

    return currentTitle.indexOf(neededTitle) >= 0;
  }

  filterByGenre = (item) => this.state.filter.genre === 'all' ? true : this.state.filter.genre === item.genre;

  render() {
    const { data } = this.props;
    const { isModalOpen } = this.state;
    const filteredList = data
      .filter(this.filterByTitle)
      .filter(this.filterByGenre)
      .map(item => <li key={item.id} className='song-list__item'><SongItem data={item} /></li>);

    return (
      <Fragment>
        <div className='row'>
          <div className='col-xs-12'>
            <FilterForm handleInput={this.handleInput} values={this.state.filter} />
          </div>
          <div className='col-xs last-sm'>
            <StickyBox bottom={false}>
              <Sidebar>
                <List addButtonCallback={this.openModal}/>
              </Sidebar>
            </StickyBox>
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
        </div>
        <Modal classNames={{ overlay: 'modal', modal: 'modal__box', closeButton: 'modal__close', closeIcon: 'modal__close-icon' }} open={isModalOpen} onClose={this.closeModal} center>
          <div className='modal__content'>
            <p className='text text--white text--semibold'>Выбранные песни добавлены в историю</p>
            <Button mods={['white']} onClick={this.closeModal}>Понятно</Button>
          </div>
        </Modal>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  data: getSortedSongs(getUnselectedSongs(state.songs), state.sorting),
});

export default connect(mapStateToProps)(SongList);
