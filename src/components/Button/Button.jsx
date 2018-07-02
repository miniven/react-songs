import React from 'react';

// Styles //

import './Button.css';

const Button = ({ className, text, ...restProps }) => (
  <button className={`button ${className ? className : ''}`} {...restProps}>{text}</button>
);

export default Button;