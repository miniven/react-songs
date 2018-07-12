import React, { Component } from 'react';
import { connect } from 'react-redux';
import UUID from 'uuid-js';
// import moment from 'moment';

// Components //

import Button from '~/components/Button/Button';

// Actions //

import { addSong, updateSong } from '~/actions/song';
import { addAuthor } from '~/actions/author';

class EditSongForm extends Component {
  state = {
    errors: {},
  }

  title  = React.createRef();
  author = React.createRef();

  validateForm = () => {
    const errors = {};

    if (!this.title.current.value) {
      errors.title = true;
    }

    this.setState({ errors });

    return errors;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = this.validateForm();
    const { songID, authors } = this.props;
    
    const currentAuthor = this.author.current.value;
    const currentTitle = this.title.current.value;
    const currentAuthorID = Object.keys(authors).find(key => authors[key] === currentAuthor);
    const authorIDToSend = currentAuthorID || UUID.create().toString();

    if (Object.keys(errors).length > 0) {
      return false;
    }

    if (!currentAuthorID && currentAuthor !== '') {
      this.props.addAuthor(authorIDToSend, currentAuthor);
    }

    this.props.updateSong(songID, {
      title: currentTitle,
      author: (currentAuthor === '' ? null : authorIDToSend),
    });

    this.props.submitCallback();

  };

  render() {
    const { errors } = this.state;
    const { songs, authors, songID } = this.props;
    const { title, author: authorID } = songs.find(song => song.id === songID);

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <label className={`form__field ${errors.title && 'form__field--invalid'}`}>
              <p className='form__label'>Название</p>
              <input
                className='form__input'
                type='text'
                name='title'
                placeholder='Someone Like You'
                defaultValue={title}
                ref={this.title}
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
                placeholder='Benjamin'
                defaultValue={authors[authorID]}
                ref={this.author}
                autoComplete='off'
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

const mapStateToProps = state => ({
  songs: state.songs,
  genres: state.genres,
  authors: state.authors,
})

export default connect(mapStateToProps, { addSong, updateSong, addAuthor })(EditSongForm);
