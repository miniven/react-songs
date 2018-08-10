import React, { Component } from 'react';

// Components //

import History from '~/components/History/History';
import TopLine from '~/components/TopLine/TopLine';
import ModalDialog from '~/components/ModalDialog/ModalDialog';

class HistoryPage extends Component {
  render() {
    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>История выбранных песен</h2>
        </TopLine>
        <History />
        <ModalDialog />
      </div>
    );
  }
};

export default HistoryPage;
