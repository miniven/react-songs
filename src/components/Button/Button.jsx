import React from 'react';
import { Link } from 'react-router-dom'

// Styles //

import './Button.css';

const Button = ({ children, className, mods, href, to, ...restProps }) => {
  const modifiers = mods ? mods.reduce((string, mod) => (`${string} button--${mod}`), '') : '';

  if (href) {
    return <a className={`${className ? className : ''} button ${modifiers}`} href={href} {...restProps}>{children}</a>;
  }

  if (to) {
    return <Link className={`${className ? className : ''} button ${modifiers}`} to={to} {...restProps}>{children}</Link>;
  }
 
  return <button className={`${className ? className : ''} button ${modifiers}`} {...restProps}>{children}</button>;
};

export default Button;