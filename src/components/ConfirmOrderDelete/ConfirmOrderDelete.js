import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { removeOrderFromList } from '~/actions/order';
import { closeModal } from '~/actions/ui';

// Components //

import Button from '~/components/Button/Button';

export class ConfirmOrderDelete extends Component {
  removeOrderFromList = () => {
    this.props.removeOrderFromList(this.props.orderID);
    this.props.closeModal();
  }

  render() {
    return (
      <Fragment>
        <p className='text text--dark text--center text--semibold'>Вы уверены, что хотите удалить этот список?</p>
        <div className="modal__footer">
          <Button className='modal__button' mods={['dark']} onClick={this.removeOrderFromList}>Да, удалить список</Button>
        </div>
      </Fragment>
    );
  }
};

export default connect(null, { removeOrderFromList, closeModal })(ConfirmOrderDelete);