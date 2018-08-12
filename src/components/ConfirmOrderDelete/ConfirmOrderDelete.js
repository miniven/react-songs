import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { updateSong } from '~/actions/song';
import { removeOrderFromList } from '~/actions/order';
import { closeModal } from '~/actions/ui';

// Components //

import Button from '~/components/Button/Button';

export class ConfirmOrderDelete extends Component {
  removeOrderFromList = () => {
    // Изменяем дату последнего исполнения песен списка и потом удаляем список
    const { [this.props.orderID]: current, ...restPrevOrders } = this.props.prevOrders;

    current.forEach(songID => {
      const lastChosen = Object.keys(restPrevOrders).find(key => restPrevOrders[key].includes(songID));

      this.props.updateSong(songID, { lastChosen });
    });

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

const mapStateToProps = state => ({
  prevOrders: state.order.previous,
});

export default connect(mapStateToProps, { updateSong, removeOrderFromList, closeModal })(ConfirmOrderDelete);