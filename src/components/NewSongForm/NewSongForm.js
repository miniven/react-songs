import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik  } from 'formik';
import moment from 'moment';

// Components //

import Select from 'react-select';
import Button from '~/components/Button/Button';
import Message from '~/components/Message/Message';

// Actions //

import { addSongOnServer } from '~/actions/song';
import { addAuthorOnServer } from '~/actions/author';

class NewSongForm extends Component {
  state = {
    status: null
  }

  handleSelect = (name, option, handler) => {
    handler({ target: { name, value: option.value || '1' } });
  }

  handleSubmit = (values) => {
    const { author } = values;
    const { authors, addSongOnServer, addAuthorOnServer } = this.props;

    // Ищем, существует ли автор с таким именем
    const authorID = Object.keys(authors).find(key => authors[key] === author);

    if (!authorID) {
      // Если автора нет, то создаем на сервере, получаем в ответ его ID и записываем песню
      addAuthorOnServer(author)
        .then(data => addSongOnServer({ ...values, created: moment().toISOString(), author: data._id }))
        .then(() => this.setState({ status: "success" }));
    } else {
      addSongOnServer({ ...values, created: moment().toISOString(), author: authorID })
        .then(() => this.setState({ status: "success" }));
    }
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
      <Fragment>
        {
          this.state.status === "success" && (
            <Message type='success' text='Новая песня успешно добавлена' />
          )
        }
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
                      placeholder='Выбрать'
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
              <div className='form__footer form__footer--align--left'>
                <Button type='submit' mods={['filled-purple', 'medium']}>Добавить</Button>
              </div>
            </form>
          )}
        />
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  songs: state.songs,
  genres: state.genres,
  authors: state.authors,
});

export default connect(mapStateToProps, { addSongOnServer, addAuthorOnServer })(NewSongForm);
