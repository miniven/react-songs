import React from 'react';

// Styles //

import './Sidebar.css';

const Sidebar = ({ className, children }) => (
  <aside className={`sidebar ${className ? className : ''}`}>{children}</aside>
);

export default Sidebar;