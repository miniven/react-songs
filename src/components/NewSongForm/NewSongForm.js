import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik  } from 'formik';
import short from 'short-uuid';
import moment from 'moment';

// Styles //

import 'react-select/dist/react-select.css';

// Components //

import Select from 'react-select';
import Button from '~/components/Button/Button';

// Actions //

import { addSong } from '~/actions/song';
import { addAuthor } from '~/actions/author';

//   validateForm = () => {
//     const errors = {};

//     if (!this.state.title) {
//       errors.title = true;
//     }

//     this.setState({ errors });

//     return errors;
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();

//     const errors = this.validateForm();

//     if (Object.keys(errors).length > 0) {
//       return false;
//     }

//     const { authors, addSong, addAuthor, submitCallback } = this.props;
//     const { author } = this.state;
//     const authorID = Object.keys(authors).find(key => authors[key] === author);
//     const authorIDToSend = authorID || translator.new();

//     if (!authorID) {
//       addAuthor(authorIDToSend, author);
//     }

//     addSong({ ...this.state, id: translator.new(), created: moment().toISOString(), author: authorIDToSend });
//     submitCallback();
//   };

class FormLayout extends Component {
  handleSelect = (name, option) => {
    this.props.handleChange({ target: { name, value: option.value || '1' } });
  }

  render() {
    const { values, errors, handleChange, handleSubmit } = this.props;

    return (
      <form className='form' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-xs-12'>
            <label className={`form__field ${errors.title && 'form__field--invalid'}`}>
              <p className='form__label'>Название</p>
              <input
                className='form__input'
                type='text'
                name='title'
                value={values.title}
                placeholder='Someone Like You'
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <label className='form__field'>
              <p className='form__label'>Автор</p>
              <input
                className='form__input'
                type='text'
                name='author'
                value={values.author}
                placeholder='Benjamin'
                onChange={handleChange}
                autoComplete='off'
              />
            </label>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <label className='form__field'>
              <p className='form__label'>Жанр</p>
              <Select
                className='form__select'
                name='genre'
                value={values.genre}
                onChange={option => this.handleSelect('genre', option)}
                options={[
                  ...Object.keys(values.genres).map(key => ({ value: key, label: values.genres[key] }))
                ]}
              />
            </label>
          </div>
        </div>
        <div className='form__footer'>
          <Button type='submit' mods={['purple']}>Добавить</Button>
        </div>
      </form>
    );
  }
};

const NewSongForm = withFormik({
  handleSubmit: (values, { props }) => {
    const translator = short();
    const { author } = values;
    const { authors, addSong, addAuthor, submitCallback } = props;

    const authorID = Object.keys(authors).find(key => authors[key] === author);
    const authorIDToSend = authorID || translator.new();

    if (!authorID) {
      addAuthor(authorIDToSend, author);
    }

    addSong({ ...values, id: translator.new(), created: moment().toISOString(), author: authorIDToSend });
    submitCallback();
  },
})(FormLayout);

const mapStateToProps = state => ({
  songs: state.songs,
  genres: state.genres,
  authors: state.authors,
});

export default connect(mapStateToProps, { addSong, addAuthor })(NewSongForm);
