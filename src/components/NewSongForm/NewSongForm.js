import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik  } from 'formik';
import short from 'short-uuid';
import moment from 'moment';

// Components //

import Select from 'react-select';
import Button from '~/components/Button/Button';

// Actions //

import { addSong } from '~/actions/song';
import { addAuthor } from '~/actions/author';

class NewSongForm extends Component {
  handleSelect = (name, option, handler) => {
    handler({ target: { name, value: option.value || '1' } });
  }

  handleSubmit = (values) => {
    const translator = short();
    const { author } = values;
    const { authors, addSong, addAuthor, submitCallback } = this.props;

    const authorID = Object.keys(authors).find(key => authors[key] === author);
    const authorIDToSend = authorID || translator.new();

    if (!authorID) {
      addAuthor(authorIDToSend, author);
    }

    addSong({ ...values, id: translator.new(), created: moment().toISOString(), author: authorIDToSend });
    submitCallback();
  }

  validate = (values, props) => {
    let errors = {};

    if (!values.title) {
      errors.title = 'required';
    }

    return errors;
  }

  render() {
    return (
      <Formik
        initialValues={{ title: '', author: '', genre: null }}
        onSubmit={this.handleSubmit}
        validate={this.validate}
        validateOnBlur={true}
        render={({ handleSubmit, handleChange, values, errors }) => (
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
                  <p className='form__label'>Настроение</p>
                  <Select
                    className='form__select'
                    name='genre'
                    searchable={false}
                    value={values.genre}
                    onChange={option => this.handleSelect('genre', option, handleChange)}
                    options={[
                      ...Object.keys(this.props.genres).map(key => ({ value: key, label: this.props.genres[key] }))
                    ]}
                  />
                </label>
              </div>
            </div>
            <div className='form__footer'>
              <Button type='submit' mods={['purple']}>Добавить</Button>
            </div>
          </form>
        )}
      />
    );
  }
};

const mapStateToProps = state => ({
  songs: state.songs,
  genres: state.genres,
  authors: state.authors,
});

export default connect(mapStateToProps, { addSong, addAuthor })(NewSongForm);
