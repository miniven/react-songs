import React from 'react';

// Styles //

import './InfoText.css';

const InfoText = (props) => (
  <p className={`info-text info-text--${props.mod}`}>{props.value}</p>
);

export default InfoText;