import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { arrayMove } from 'react-sortable-hoc';

// Styles //

import './List.css';

// Selectors //

import { getOrderedSongs } from '~/reducers/songReducer';

// Actions //

import { removeItem, addOrderToList } from '~/actions/order';
import { setSongActivity, updateSong, resetSongsActivity } from '~/actions/song';
import { openModal } from '~/actions/ui';

// Components //

import Message from '~/components/Message/Message';
import Button from '~/components/Button/Button';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

class List extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const lastAdded = nextProps.orderedData[nextProps.orderedData.length - 1];
    const shouldLastBeAdded = nextProps.orderedData.length > prevState.list.length;

    return {
      list: shouldLastBeAdded ? [...prevState.list, lastAdded] : prevState.list,
    }
  }

  state = {
    list: this.props.orderedData,
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      list: arrayMove(this.state.list, oldIndex, newIndex),
    });
  }

  onRemoveItem = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id),
    });

    this.props.setSongActivity(id, false);
    this.props.removeItem(id);
  }

  saveList = () => {
    const curDate = moment().toISOString();
    const order = this.state.list.map(item => item.id);

    this.props.addOrderToList(curDate, order);
    this.props.resetSongsActivity(curDate, order);
    this.props.openModal('showSuccess');
  }

  render() {
    const { className, orderedData } = this.props;

    if (orderedData.length === 0) {
      return <Message className='sidebar__message' type='info' text='Ни одной песни пока не добавлено' />
    }

    return (
      <Fragment>
        <SortableSongList list={this.state.list} onSortEnd={this.onSortEnd} onRemoveItem={this.onRemoveItem} className={className ? className : ''} />
        <Button className='sidebar__button' mods={['green', 'block']} onClick={this.saveList}>Сохранить</Button>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  orderedData: getOrderedSongs(state.songs, state.order.current),
  order: state.order.current,
});

export default connect(mapStateToProps, { removeItem, addOrderToList, setSongActivity, updateSong, resetSongsActivity, openModal })(List);