import React from 'react';

// Styles //

import './Button.css';

const Button = ({ className, text, ...restProps }) => (
  <div className={`button ${className ? className : ''}`} {...restProps}>
    {text}
    <button className='button__close'></button>
  </div>
);

export default Button;