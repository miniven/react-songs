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
              <NavLink to='/' exact className='navbar__link navbar__link--home' activeClassName='navbar__link--active'>
                <p className="navbar__text">Главная</p>
              </NavLink>
            </li>
            <li className='navbar__item'>
              <NavLink to='/history' exact className='navbar__link navbar__link--history' activeClassName='navbar__link--active'>
                <p className="navbar__text">История</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;