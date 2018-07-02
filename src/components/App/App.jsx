import React from 'react';

// Components //

import List from '~/components/List/List';
import Sidebar from '~/components/Sidebar/Sidebar';

const App = (props) => (
  <div className="app">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <Sidebar className="app__sidebar">
            <List />
          </Sidebar>
        </div>
      </div>
    </div>
  </div>
);

export default App;