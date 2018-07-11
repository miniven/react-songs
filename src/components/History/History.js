import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

// Styles //

import './History.css';

// Components //

import Message from '~/components/Message/Message';

class History extends Component {
  componentWillMount = () => {
    moment().locale('ru');
  }

  isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  }

  findSong = (id) => {
    return this.props.songs.find(song => song.id === id);
  }

  render() {
    const { history } = this.props;

    if (this.isEmptyObject(history)) {
      return <Message className='song-list__message' type='info' text='Вы пока не добавили ни одного списка песен' />;
    }

    const renderSongList = (key) => this.props.history[key].map((id) => (
      <li className='history__list-item' key={id}>
        { this.findSong(id).title }
      </li>
    ));

    return (
      <div className='row'>
        {
          Object.keys(history).map((date) => {
            const momentDate = moment(date);

            return (
              <div className='col-xs col-md-3'>
                <div className='history' key={date}>
                  <div className="history__header">
                    <p className='history__date'>{ momentDate.format('DD.MM.YYYY') }</p>
                    <p className='history__day'>{ momentDate.format('dddd') }</p>
                  </div>
                  <ul className='history__list'>{ renderSongList(date) }</ul>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  songs: state.songs,
  history: state.order.previous,
})

export default connect(mapStateToProps)(History);