import React, { Component } from 'react';

// Components //

import TopLine from '~/components/TopLine/TopLine';
import List from '~/components/List/List';

class SelectedSongsPage extends Component {
  render() {
    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Выбранные песни</h2>
        </TopLine>
        <List addButtonCallback={() => console.log('showSuccess')}/>
      </div>
    );
  }
};

export default SelectedSongsPage;
