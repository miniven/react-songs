import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions //

import { openModal } from '~/actions/ui';

// Components //

import SongList from '~/components/SongList/SongList';
import TopLine from '~/components/TopLine/TopLine';
import Button from '~/components/Button/Button';
import ModalDialog from '~/components/ModalDialog/ModalDialog';

class SongListPage extends Component {
  render() {
    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Список песен</h2>
          <Button className='top-line__button' mods={['filled-purple']} to="/create">Добавить песню</Button>
        </TopLine>
        <SongList />
        <ModalDialog />
      </div>
    );
  }
};

export default connect(null, { openModal })(SongListPage);