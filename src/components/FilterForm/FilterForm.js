import React, { Component } from 'react';

// Styles //

import './FilterForm.css';

class FilterForm extends Component {
  render() {
    return (
      <form className='form'>
        <label className='form__field'>
          <p className='form__label'>Название</p>
          <input className='form__input' type='text' name='title' />
        </label>
      </form>
    );
  }
};

export default FilterForm;