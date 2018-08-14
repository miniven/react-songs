import React from 'react';
import moment from 'moment';

// Styles //

import './Label.css';

const Label = ({ className, type, date }) => {
  const parentClassName = className ? className : '';

  switch (type) {
    case 'new':
      return <p className={`${parentClassName} label label--new`}>Новая</p>;
    case 'recent':
      return (
        <p className={`${parentClassName} label label--recent`}>
          {
            `${moment().diff(moment(date, 'days')) > 0 ? 'Исполнялась' : 'Запланирована на'} ${date.format('DD.MM.YYYY')}`
          }
        </p>
      );
    default:
      return <p className={`${parentClassName} label`}>Label</p>
  }
};

export default Label;