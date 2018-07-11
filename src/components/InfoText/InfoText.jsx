import React from 'react';

// Styles //

import './InfoText.css';

const InfoText = ({ className, mod, value }) => (
  <p className={`${className ? className : ''} info-text info-text--${mod}`}>{value || 'Неизвестен'}</p>
);

export default InfoText;