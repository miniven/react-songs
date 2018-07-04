import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles //

import './FilterForm.css';
import 'react-select/dist/react-select.css';

// Components //

import Select from 'react-select';

class FilterForm extends Component {
  handleSelect = (name, option) => {
    this.props.handleInput({ target: { name, value: option ? option.value : 'all' } });
  }

  render() {
    const { genres, handleInput, values } = this.props;

    return (
      <form className='form'>
        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-8'>
            <label className='form__field'>
              <p className='form__label'>Название</p>
              <input
                className='form__input'
                type='text'
                name='title'
                value={values.title}
                autoComplete='off'
                onChange={handleInput}
              />
            </label>
          </div>
          <div className='col-xs-12 col-sm-6 col-md-4'>
            <label className='form__field'>
              <p className='form__label'>Жанр</p>
              <Select
                className='form__select'
                name='genre'
                value={values.genre}
                onChange={(option) => this.handleSelect('genre', option)}
                options={[
                  { value: 'all', label: 'Все жанры' },
                  ...Object.keys(genres).map(key => ({ value: key, label: genres[key] }))
                ]}
              />
            </label>
          </div>
        </div>
      </form>
    );
  }
};

const mapStateToProps = state => ({
  genres: state.genres,
})

export default connect(mapStateToProps)(FilterForm);