import React from 'react';
import { connect } from 'react-redux';

// Styles //

import './List.css';

// Components //

import Button from '~/components/Button/Button';

const List = ({ className, data }) => (
  <ul className={`list ${className ? className : ''}`}>
    {
      Object.keys(data).map(key => (
        <li className='list__item' key={key}>
          <Button className='list__button button--left' text={data[key]}/>
        </li>
      ))
    }
  </ul>
);

const mapStateToProps = state => ({
  data: state.songs,
});

export default connect(mapStateToProps, null)(List);