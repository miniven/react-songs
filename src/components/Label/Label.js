import React from 'react';

// Styles //

import './Label.css';

const Label = ({ className, type }) => {
  const parentClassName = className ? className : '';

  switch (type) {
    case 'new':
      return <p className={`${parentClassName} label label--new`}>Новая</p>;
    case 'recent':
      return <p className={`${parentClassName} label label--recent`}>Исполнялась недавно</p>;
    default:
      return <p className={`${parentClassName} label`}>Label</p>
  }
};

export default Label;