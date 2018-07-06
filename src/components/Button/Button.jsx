import React from 'react';

// Styles //

import './Button.css';

const Button = ({ children, className, mods, href, ...restProps }) => {
  const modifiers = mods.reduce((string, mod) => (`${string} button--${mod}`), '');

  if (href) {
    return <a className={`${className ? className : ''} button ${modifiers}`} href={href} {...restProps}>{children}</a>;
  }
 
  return <button className={`${className ? className : ''} button ${modifiers}`} {...restProps}>{children}</button>;
};

export default Button;