import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { openModal, closeModal, setActionType } from '~/actions/ui';

// Components //

import Modal from 'react-responsive-modal';
import SongList from '~/components/SongList/SongList';
import TopLine from '~/components/TopLine/TopLine';
import Button from '~/components/Button/Button';
import NewSongForm from '~/components/NewSongForm/NewSongForm';
import EditSongForm from '~/components/EditSongForm/EditSongForm';
import ConfirmSongDelete from '~/components/ConfirmSongDelete/ConfirmSongDelete';

class SongListPage extends Component {
  render() {
    const renderModalContent = () => {
      switch (this.props.modal.actionType) {
        case 'edit':
          return <EditSongForm songID={this.props.modal.selectedSong} />;
        case 'showSuccess':
          return (
            <Fragment>
              <p className='text text--white text--center text--semibold'>Выбранные песни добавлены в историю</p>
              <div className="modal__footer">
                <Button className='modal__button' mods={['white']} onClick={this.props.closeModal}>Понятно</Button>
                <Button className='modal__button' mods={['white']} to='/history'>Перейти к истории</Button>
              </div>
            </Fragment>
          );
        case 'delete':
          return <ConfirmSongDelete songID={this.props.modal.selectedSong} />;
        default:
          return <NewSongForm />;
      }
    };

    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Список песен</h2>
          <Button className='top-line__button' mods={['filled-purple']} onClick={this.props.openModal}>Добавить песню</Button>
        </TopLine>
        <SongList />
        <Modal
          classNames={{
            overlay: 'modal',
            modal: `modal__box modal__box--wide modal__box--left ${this.props.modal.actionType === 'delete' ? 'modal__box--orange' : ''} ${this.props.modal.actionType === 'showSuccess' ? 'modal__box--green' : ''}`,
            closeButton: 'modal__close',
            closeIcon: 'modal__close-icon--secondary'
          }}
          open={this.props.modal.isModalOpen}
          onClose={this.props.closeModal}
          center
        >
          <div className='modal__content'>
            { renderModalContent() }
          </div>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  modal: state.ui.modal,
});

export default connect(mapStateToProps, { openModal, closeModal, setActionType })(SongListPage);