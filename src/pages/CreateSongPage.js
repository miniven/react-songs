import React, { Component } from 'react';

// Components //

import TopLine from '~/components/TopLine/TopLine';
import NewSongForm from '~/components/NewSongForm/NewSongForm';

class CreateSongPage extends Component {
  render() {
    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Добавить песню</h2>
        </TopLine>
        <div className='row'>
          <div className='col-xs-12 col-md-8'>
            <NewSongForm />
          </div>
        </div>
      </div>
    );
  }
};

export default CreateSongPage;
