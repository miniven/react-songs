import React, { Component } from 'react';

// Styles //

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          <ul className='navbar__list'>
            <li className='navbar__item'>
              <a className='navbar__link' href='#d'>Главная</a>
            </li>
            <li className='navbar__item'>
              <a className='navbar__link' href='#g'>Личный кабинет</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;