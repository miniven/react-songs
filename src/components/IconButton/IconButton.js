import React from 'react';

// Styles //

import './IconButton.css';

const IconButton = ({ className, type, onClick }) => {
  return <button type='button' className={`icon-button icon-button--${type} ${className ? className : ''}`} onClick={onClick}></button>;
};

export default IconButton;