import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Styles //

import './List.css';

// Selectors //

import { getOrderedSongs } from '~/reducers/songReducer';

// Actions //

import { changeOrder, addOrderToList } from '~/actions/order';
import { resetSongsActivity } from '~/actions/song';
import { openModal } from '~/actions/ui';

// Components //

import Message from '~/components/Message/Message';
import Button from '~/components/Button/Button';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

class List extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.changeOrder(oldIndex, newIndex);
  }

  saveList = () => {
    const curDate = moment().toISOString();

    this.props.addOrderToList(curDate, this.props.order);
    this.props.resetSongsActivity(curDate, this.props.order);
    this.props.openModal('showSuccess');
  }

  render() {
    const { className, orderedData } = this.props;

    if (orderedData.length === 0) {
      return <Message className='sidebar__message' type='info' text='Ни одной песни пока не добавлено' />
    }

    return (
      <Fragment>
        <SortableSongList list={orderedData} onSortEnd={this.onSortEnd} className={className ? className : ''} />
        <Button className='sidebar__button' mods={['green']} onClick={this.saveList}>Сохранить</Button>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  orderedData: getOrderedSongs(state.songs, state.order.current),
  order: state.order.current,
});

export default connect(mapStateToProps, { changeOrder, addOrderToList, resetSongsActivity, openModal })(List);