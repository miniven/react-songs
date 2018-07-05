import React from 'react';

// Styles //

import './Message.css';

const Message = ({ className, type, text }) => {
  const parentClassName = className ? className : '';
  const typeClassName = type ? `message--${type}` : '';

  return <p className={`${parentClassName} message ${typeClassName}`}>{text}</p>
};

export default Message;
