import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { updateMultipleSongs } from '~/actions/song';
import { removeListFromHistory } from '~/actions/order';
import { closeModal } from '~/actions/ui';

// Components //

import Button from '~/components/Button/Button';

export class ConfirmOrderDelete extends Component {
  removeListFromHistory = () => {
    // Изменяем дату последнего исполнения песен списка и потом удаляем список
    const { [this.props.orderID]: current, ...restPrevOrders } = this.props.prevOrders;

    const dataToUpdate = current.list.reduce((result, songID) => ({
      ...result,
      [songID]: { lastChosen: Object.keys(restPrevOrders).find(key => restPrevOrders[key].list.includes(songID)) },
    }), {});

    this.props.updateMultipleSongs(dataToUpdate);
    this.props.removeListFromHistory(this.props.orderID);
    this.props.closeModal();
  }

  render() {
    return (
      <Fragment>
        <p className='text text--white text--center text--semibold'>Вы уверены, что хотите удалить этот список?</p>
        <div className="modal__footer">
          <Button className='modal__button' mods={['white']} onClick={this.removeListFromHistory}>Да, удалить список</Button>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  prevOrders: state.order.previous,
});

export default connect(mapStateToProps, { updateMultipleSongs, removeListFromHistory, closeModal })(ConfirmOrderDelete);