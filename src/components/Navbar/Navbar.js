import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import Media from 'react-media';

// Constants //

import { MEDIA_MD } from '~/constants';

// Selectors //

import { getSelectedSongs } from '~/reducers/songReducer';

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
                <p className='navbar__text'>Главная</p>
              </NavLink>
            </li>
            <li className='navbar__item'>
              <NavLink to='/history' exact className='navbar__link navbar__link--history' activeClassName='navbar__link--active'>
                <p className='navbar__text'>История</p>
              </NavLink>
            </li>
            <Media query={MEDIA_MD}>
              {
                matches => !matches && (
                  <li className='navbar__item'>
                    <NavLink to='/selected' exact className='navbar__link navbar__link--music' activeClassName='navbar__link--active'>
                      { this.props.selectedSongs.length > 0 && <p className='navbar__counter'>{this.props.selectedSongs.length}</p> }
                      <p className='navbar__text'>Выбранные песни</p>
                    </NavLink>
                  </li>
                )
              }
            </Media>
          </ul>
        </div>
      </nav>
    );
  }
};

const mapStateToProps = state => ({
  selectedSongs: getSelectedSongs(state.songs),
});

export default withRouter(connect(mapStateToProps)(Navbar));