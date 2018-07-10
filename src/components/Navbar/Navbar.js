import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

// Styles //

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          <ul className='navbar__list'>
            <li className='navbar__item'>
              <NavLink to='/' exact className='navbar__link' activeClassName='navbar__link--active'>Главная</NavLink>
            </li>
            <li className='navbar__item'>
              <NavLink to='/history' exact className='navbar__link' activeClassName='navbar__link--active'>История</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;