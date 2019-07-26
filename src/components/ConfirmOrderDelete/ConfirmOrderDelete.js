import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions //

import { updateSongsOnServer } from '~/actions/song';
import { removeListFromHistoryOnServer } from '~/actions/order';
import { closeModal } from '~/actions/ui';

// Selectors //

import { getListsBeforeRemoving } from '~/selectors/order';

// Components //

import Button from '~/components/Button/Button';

export class ConfirmOrderDelete extends Component {
  removeListFromHistory = () => {
    const { listToRemove, listsBeforeRemoving, orderID } = this.props;

    // Изменяем дату последнего исполнения песен списка и потом удаляем список
    const dataToUpdate = listToRemove.list.reduce((result, songID) => {
      const lastChosenID = Object.keys(listsBeforeRemoving).find(key => listsBeforeRemoving[key].list.includes(songID));
      const lastChosenList = listsBeforeRemoving[lastChosenID];

      return {
        ...result,
        [songID]: { lastChosen: lastChosenList ? lastChosenList.date : false },
      };
    }, {});

    this.props.updateSongsOnServer(dataToUpdate);
    this.props.removeListFromHistoryOnServer(orderID);
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

const mapStateToProps = (state, props) => ({
  listToRemove: state.order.previous[props.orderID],
  listsBeforeRemoving: getListsBeforeRemoving(state.order.previous, props.orderID),
});

export default connect(mapStateToProps, { updateSongsOnServer, removeListFromHistoryOnServer, closeModal })(ConfirmOrderDelete);