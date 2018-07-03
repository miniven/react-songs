import React from 'react';

// Styles //

import './InfoText.css';

const InfoText = (props) => (
  <p className={`info-text info-text--${props.mod}`}>{props.value || 'Неизвестен'}</p>
);

export default InfoText;