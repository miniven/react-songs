import React from 'react';

// Styles //

import './Label.css';

const Label = ({ type }) => {
  switch (type) {
    case 'new':
      return <p className="label label--new">Новая</p>;
    default:
      return <p className="label">Label</p>
  }
};

export default Label;