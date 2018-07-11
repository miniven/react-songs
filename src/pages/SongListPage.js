import React, { Component } from 'react';

// Components //

import SongList from '~/components/SongList/SongList';
import TopLine from '~/components/TopLine/TopLine';
import Button from '~/components/Button/Button';

class SongListPage extends Component {
  render() {
    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Список песен</h2>
          <Button className='top-line__button' mods={['filled-purple']}>Добавить песню</Button>
        </TopLine>
        <SongList />
      </div>
    );
  }
};

export default SongListPage;