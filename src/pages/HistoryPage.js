import React, { Component } from 'react';

// Components //

import History from '~/components/History/History';

class HistoryPage extends Component {
  render() {
    return (
      <div className='container'>
        <h2 className='title'>История выбранных песен</h2>
        <History />
      </div>
    );
  }
};

export default HistoryPage;
