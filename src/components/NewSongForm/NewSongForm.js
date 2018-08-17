import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik  } from 'formik';
import moment from 'moment';

// Components //

import Select from 'react-select';
import Button from '~/components/Button/Button';

// Actions //

import { addSongOnServer } from '~/actions/song';
import { addAuthorOnServer } from '~/actions/author';
import { closeModal } from '~/actions/ui';

class NewSongForm extends Component {
  handleSelect = (name, option, handler) => {
    handler({ target: { name, value: option.value || '1' } });
  }

  handleSubmit = (values) => {
    const { author } = values;
    const { authors, addSongOnServer, addAuthorOnServer, closeModal } = this.props;

    // Ищем, существует ли автор с таким именем
    const authorID = Object.keys(authors).find(key => authors[key] === author);

    if (!authorID) {
      // Если автора нет, то создаем на сервере, получаем в ответ его ID и записываем песню
      addAuthorOnServer(author)
        .then(data => addSongOnServer({ ...values, created: moment().toISOString(), author: data._id }))
    } else {
      addSongOnServer({ ...values, created: moment().toISOString(), author: authorID });
    }

    closeModal();
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

export default connect(mapStateToProps, { addSongOnServer, addAuthorOnServer, closeModal })(NewSongForm);
