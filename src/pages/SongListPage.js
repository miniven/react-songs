import React, { Component } from 'react';

// Components //

import Modal from 'react-responsive-modal';
import SongList from '~/components/SongList/SongList';
import TopLine from '~/components/TopLine/TopLine';
import Button from '~/components/Button/Button';
import NewSongForm from '~/components/NewSongForm/NewSongForm';

class SongListPage extends Component {
  state = {
    isModalOpen: false,
    editingSong: null,
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false, editingSong: null });
  }

  setEditingSong = (id) => {
    this.setState({ isModalOpen: true, editingSong: id });
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Список песен</h2>
          <Button className='top-line__button' mods={['filled-purple']} onClick={this.openModal}>Добавить песню</Button>
        </TopLine>
        <SongList setEditingSong={this.setEditingSong} />
        <Modal
          classNames={{ overlay: 'modal', modal: 'modal__box modal__box--wide modal__box--left', closeButton: 'modal__close', closeIcon: 'modal__close-icon--secondary' }}
          open={isModalOpen}
          onClose={this.closeModal}
          center
        >
          <div className='modal__content'>
            <NewSongForm submitCallback={this.closeModal} edit={this.state.editingSong}/>
          </div>
        </Modal>
      </div>
    );
  }
};

export default SongListPage;