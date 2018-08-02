import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components //

import Message from '~/components/Message/Message';
import HistoryItem from '~/components/HistoryItem/HistoryItem';

class History extends Component {
  isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  }

  render() {
    const { history } = this.props;

    if (this.isEmptyObject(history)) {
      return <Message className='song-list__message' type='info' text='Вы пока не добавили ни одного списка песен' />;
    }

    return (
      <div className='row'>
        {
          Object.keys(history).map((date) => {
            return (
              <div key={date} className='col-xs col-md-3'>
                <HistoryItem date={date} />
              </div>
            )
          })
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  history: state.order.previous,
})

export default connect(mapStateToProps)(History);