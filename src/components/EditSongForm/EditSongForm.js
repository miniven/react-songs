import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik  } from 'formik';
import short from 'short-uuid';
// import moment from 'moment';

// Styles //

import 'react-select/dist/react-select.css';

// Components //

import Select from 'react-select';
import Button from '~/components/Button/Button';

// Actions //

import { addSong, updateSong } from '~/actions/song';
import { addAuthor } from '~/actions/author';

class EditSongForm extends Component {
  handleSelect = (name, option, handler) => {
    handler({ target: { name, value: option.value || '1' } });
  }

  handleSubmit = (values) => {
    const translator = short();
    const { songID, authors, songs, addAuthor, updateSong, submitCallback } = this.props;
    const { title, author: authorID } = songs.find(song => song.id === songID);
    
    const currentAuthor = values.author || authors[authorID];
    const currentTitle = values.title || title;
    const currentAuthorID = Object.keys(authors).find(key => authors[key] === currentAuthor);
    const authorIDToSend = currentAuthorID || translator.new();

    if (!currentAuthorID && currentAuthor !== '') {
      addAuthor(authorIDToSend, currentAuthor);
    }

    updateSong(songID, {
      title: currentTitle,
      author: (currentAuthor === '' ? null : authorIDToSend),
      genre: values.genre,
    });

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
    const { authors, songs, genres, songID } = this.props;
    const { title, author: authorID, genre: genreID } = songs.find(song => song.id === songID);

    return (
      <Formik
        initialValues={{ title, author: authors[authorID] || '', genre: genreID }}
        onSubmit={this.handleSubmit}
        validate={this.validate}
        validateOnBlur={true}
        render={({ handleSubmit, handleChange, values, errors }) => (
          <form className="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xs-12">
                <label className={`form__field ${errors.title && 'form__field--invalid'}`}>
                  <p className='form__label'>Название</p>
                  <input
                    className='form__input'
                    type='text'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    placeholder='Someone Like You'
                    autoComplete='off'
                  />
                </label>
              </div>
              <div className="col-xs-12 col-sm-6">
                <label className='form__field'>
                  <p className='form__label'>Автор</p>
                  <input
                    className='form__input'
                    type='text'
                    name='author'
                    value={values.author}
                    onChange={handleChange}
                    placeholder='Benjamin'
                    autoComplete='off'
                  />
                </label>
              </div>
              <div className="col-xs-12 col-sm-6">
                <label className='form__field'>
                  <p className='form__label'>Жанр</p>
                  <Select
                    className='form__select'
                    name='genre'
                    value={values.genre}
                    onChange={(option) => this.handleSelect('genre', option, handleChange)}
                    options={[
                      ...Object.keys(genres).map(key => ({ value: key, label: genres[key] }))
                    ]}
                  />
                </label>
              </div>
            </div>
            <div className="form__footer">
              <Button type='submit' mods={['purple']}>Сохранить</Button>
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
})

export default connect(mapStateToProps, { addSong, updateSong, addAuthor })(EditSongForm);