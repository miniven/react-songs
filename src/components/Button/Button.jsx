import React from 'react';

// Styles //

import './Button.css';

const Button = ({ children, className, href, ...restProps }) => {
  if (href) {
    return <a className={`button ${className ? className : ''}`} href={href} {...restProps}>{children}</a>;
  }
 
  return <button className={`button ${className ? className : ''}`} {...restProps}>{children}</button>;
};

export default Button;