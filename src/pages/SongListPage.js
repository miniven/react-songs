import React, { Component } from 'react';

// Components //

import SongList from '~/components/SongList/SongList';

class SongListPage extends Component {
  render() {
    return (
      <div className='container'>
        <h2 className='title'>Список песен</h2>
        <SongList />
      </div>
    );
  }
};

export default SongListPage;