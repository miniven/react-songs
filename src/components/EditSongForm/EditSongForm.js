import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik  } from 'formik';
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

class FormLayout extends Component {
  // validateForm = () => {
  //   const errors = {};

  //   if (!this.title.current.value) {
  //     errors.title = true;
  //   }

  //   this.setState({ errors });

  //   return errors;
  // }

  handleSelect = (name, option) => {
    console.log(name, option);
  }

  render() {
    const { values, errors, handleChange, handleSubmit } = this.props;
    const { title, author: authorID, genre: genreID } = values.songs.find(song => song.id === values.songID);

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <label className={`form__field ${errors.title && 'form__field--invalid'}`}>
              <p className='form__label'>Название</p>
              <input
                className='form__input'
                type='text'
                name='title'
                value={values.title || title}
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
                value={values.author || values.authors[authorID]}
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
                value={values.genre || genreID}
                onChange={(option) => this.handleSelect('genre', option)}
                options={[
                  ...Object.keys(values.genres).map(key => ({ value: key, label: values.genres[key] }))
                ]}
              />
            </label>
          </div>
        </div>
        <div className="form__footer">
          <Button type='submit' mods={['purple']}>Добавить</Button>
        </div>
      </form>
    );
  }
};

const EditSongForm = withFormik({
  handleSubmit: (values, { props }) => {
    const translator = short();
    // const errors = this.validateForm();
    const { songID, authors } = props;
    const { title, author: authorID } = props.songs.find(song => song.id === props.songID);
    
    const currentAuthor = values.author || authors[authorID];
    const currentTitle = values.title || title;
    const currentAuthorID = Object.keys(authors).find(key => authors[key] === currentAuthor);
    const authorIDToSend = currentAuthorID || translator.new();

    // // if (Object.keys(errors).length > 0) {
    // //   return false;
    // // }

    if (!currentAuthorID && currentAuthor !== '') {
      props.addAuthor(authorIDToSend, currentAuthor);
    }

    props.updateSong(songID, {
      title: currentTitle,
      author: (currentAuthor === '' ? null : authorIDToSend),
    });

    props.submitCallback();
  },
})(FormLayout);

const mapStateToProps = state => ({
  songs: state.songs,
  genres: state.genres,
  authors: state.authors,
})

export default connect(mapStateToProps, { addSong, updateSong, addAuthor })(EditSongForm);
