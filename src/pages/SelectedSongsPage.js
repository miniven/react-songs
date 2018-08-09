import React, { Component } from 'react';

// Components //

import TopLine from '~/components/TopLine/TopLine';
import List from '~/components/List/List';
import ModalDialog from '~/components/ModalDialog/ModalDialog';

class SelectedSongsPage extends Component {
  render() {
    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Выбранные песни</h2>
        </TopLine>
        <List addButtonCallback={() => console.log('showSuccess')}/>
        <ModalDialog />
      </div>
    );
  }
};

export default SelectedSongsPage;
