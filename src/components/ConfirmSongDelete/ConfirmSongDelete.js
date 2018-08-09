import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { deleteSong } from '~/actions/song';
import { closeModal } from '~/actions/ui';

// Components //

import Button from '~/components/Button/Button';

export class ConfirmSongDelete extends Component {
  deleteSong = () => {
    this.props.deleteSong(this.props.songID);
    this.props.closeModal();
  }

  render() {
    return (
      <Fragment>
        <p className='text text--dark text--center text--semibold'>Вы уверены, что хотите удалить эту песню?</p>
        <div className="modal__footer">
          <Button className='modal__button' mods={['dark']} onClick={this.deleteSong}>Да, удалить песню</Button>
        </div>
      </Fragment>
    );
  }
};

export default connect(null, { deleteSong, closeModal })(ConfirmSongDelete);