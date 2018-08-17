import API from '~/api/';
import { SET_AUTHORS, ADD_AUTHOR } from '~/types/author';

export const setAuthors = data => ({
  type: SET_AUTHORS,
  data,
});

export const fetchAuthors = () => dispatch => {
  return API.authors
    .fetch()
    .then((data) => {
      // Данные поступают в виде массива объектов, а должны быть объектом
      const preparedData = data.reduce((result, item) => ({
        ...result,
        [item._id]: item.name,
      }), {});

      dispatch(setAuthors(preparedData));
    })
    .catch(err => console.log(err));
};

export const addAuthor = (id, name) => ({
  type: ADD_AUTHOR,
  id,
  name,
});

export const addAuthorOnServer = name => dispatch => {
  return API.authors
    .create(name)
    .then((data) => {
      dispatch(addAuthor(data._id, name));

      return data;
    })
    .catch(err => console.log(err));
};