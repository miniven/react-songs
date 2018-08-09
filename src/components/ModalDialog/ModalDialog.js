import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { closeModal } from '~/actions/ui';

// Components //

import Modal from 'react-responsive-modal';
import Button from '~/components/Button/Button';
import NewSongForm from '~/components/NewSongForm/NewSongForm';
import EditSongForm from '~/components/EditSongForm/EditSongForm';
import ConfirmSongDelete from '~/components/ConfirmSongDelete/ConfirmSongDelete';

class ModalDialog extends Component {
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
                <Button className='modal__button' mods={['white']} onClick={this.props.closeModal} to='/history'>Перейти к истории</Button>
              </div>
            </Fragment>
          );
        case 'delete':
          return <ConfirmSongDelete songID={this.props.modal.selectedSong} />;
        default:
          return <NewSongForm />;
      }
    };

    const getActionClassName = (actionType) => {
      switch (actionType) {
        case 'showSuccess':
          return 'modal__box--green';
        case 'delete':
          return 'modal__box--orange';
        default:
          return '';
      }
    }

    return (
      <Modal
        classNames={{
          overlay: 'modal',
          modal: `modal__box modal__box--left ${getActionClassName(this.props.modal.actionType)}`,
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
    );
  }
};

const mapStateToProps = state => ({
  modal: state.ui.modal,
});

export default connect(mapStateToProps, { closeModal })(ModalDialog);
