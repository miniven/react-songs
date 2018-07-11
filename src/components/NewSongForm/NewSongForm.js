import React, { Component } from 'react';
import { connect } from 'react-redux';
import UUID from 'uuid-js';
import moment from 'moment';

// Styles //

import 'react-select/dist/react-select.css';

// Components //

import Select from 'react-select';
import Button from '~/components/Button/Button';

// Actions //

import { addSong } from '~/actions/song';
import { addAuthor } from '~/actions/author';

class NewSongForm extends Component {
  state = {
    title: '',
    author: '',
    genre: '1',
  }

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSelect = (name, option) => {
    switch (name) {
      case 'genre':
        this.handleInput({ target: { name, value: option ? option.value : 'all' } });
        break;
      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { authors, addSong, addAuthor, submitCallback } = this.props;
    const { author } = this.state;
    const authorID = Object.keys(authors).find(key => authors[key] === author);
    const authorIDToSend = authorID || UUID.create().toString();

    if (!authorID) {
      addAuthor(authorIDToSend, author);
    }

    addSong({ ...this.state, id: UUID.create().toString(), created: moment().toISOString(), author: authorIDToSend });
    submitCallback();
  };

  render() {
    const { genres } = this.props;
    const { title, author, genre } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <label className='form__field'>
              <p className='form__label'>Название</p>
              <input
                className='form__input'
                type='text'
                name='title'
                placeholder='Someone Like You'
                value={title}
                onChange={this.handleInput}
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
                value={author}
                onChange={this.handleInput}
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
                value={genre}
                onChange={(option) => this.handleSelect('genre', option)}
                options={[
                  ...Object.keys(genres).map(key => ({ value: key, label: genres[key] }))
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

const mapStateToProps = state => ({
  genres: state.genres,
  authors: state.authors,
})

export default connect(mapStateToProps, { addSong, addAuthor })(NewSongForm);
