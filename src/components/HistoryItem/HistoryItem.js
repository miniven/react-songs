import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

// Styles //

import './HistoryItem.css';

// Actions //

import { removeOrderFromList, changeHistoryOrder } from '~/actions/order';

// Components //

import Button from '~/components/Button/Button';
import SongButton from '~/components/SongButton/SongButton';
import IconButton from '~/components/IconButton/IconButton';
import SortableSongList from '~/components/SortableSongList/SortableSongList';

class HistoryItem extends Component {
  state = {
    isEditing: false,
  }

  componentWillMount = () => {
    moment().locale('ru');
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.changeHistoryOrder(this.props.date, oldIndex, newIndex);
  }

  findSong = (id) => {
    return this.props.songs.find(song => song.id === id);
  }

  render() {
    const { date, history } = this.props;
    const { isEditing } = this.state;
    const momentDate = moment(date);

    return (
      <div className='history-item'>
        <div className='history-item__box'>
          { !isEditing && <IconButton className='history-item__button' onClick={this.toggleEdit} type='edit' /> }
          <IconButton className='history-item__button' onClick={() => this.props.removeOrderFromList(date)} type='delete' />
        </div>
        <div className='history-item__header'>
          <p className='history-item__date'>{ momentDate.format('DD.MM.YYYY') }</p>
          <p className='history-item__day'>{ momentDate.format('dddd') }</p>
        </div>
        {
          isEditing ? (
            <Fragment>
              <SortableSongList list={history[date].map(id => this.findSong(id))} onSortEnd={this.onSortEnd} />
              <div className='history-item__footer'>
                <Button mods={['green']} onClick={this.toggleEdit}>Сохранить</Button>
              </div>
            </Fragment>
          ) : (
            <ul className='history-item__list'>
              {
                history[date].map(id => (
                  <li className='history-item__list-item' key={id}>
                    <SongButton className='list__button' data={this.findSong(id)} />
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  songs: state.songs,
  history: state.order.previous,
})

export default connect(mapStateToProps, { removeOrderFromList, changeHistoryOrder })(HistoryItem);