// import axios from 'axios';
import { songs, authors, history } from './fake_data';

// const root = 'http://192.168.1.137:4000';
// const root = 'http://localhost:4000';

// export default {
//   songs: {
//     fetch: () => axios.get(`${root}/api/songs/`).then(res => res.data),
//     create: data => axios.post(`${root}/api/songs/create/`, data).then(res => res.data),
//     delete: id => axios.post(`${root}/api/songs/delete/${id}`).then(res => res.data),
//     update: data => axios.post(`${root}/api/songs/update/`, data).then(res => res.data),
//     updateMultiple: data => axios.post(`${root}/api/songs/update_multiple/`, data).then(res => res.data),
//   },
//   authors: {
//     fetch: () => axios.get(`${root}/api/authors/`).then(res => res.data),
//     create: name => axios.post(`${root}/api/authors/create/`, { name }).then(res => res.data),
//   },
//   history: {
//     fetch: () => axios.get(`${root}/api/history/`).then(res => res.data),
//     create: data => axios.post(`${root}/api/history/create/`, data).then(res => res.data),
//     deleteFromHistory: id => axios.post(`${root}/api/history/delete_from_history/${id}`).then(res => res.data),
//     delete: id => axios.post(`${root}/api/history/delete/${id}`).then(res => res.data),
//   },
// };

export default {
  songs: {
    fetch: () => Promise.resolve(songs.fetch),
    create: () => Promise.resolve(songs.create),
    delete: () => Promise.resolve(),
    // update: ,
    updateMultiple: () => Promise.resolve(songs.updateMultiple),
  },
  authors: {
    fetch: () => Promise.resolve(authors.fetch),
    create: () => Promise.resolve(authors.create),
  },
  history: {
    fetch: () => Promise.resolve(history.fetch),
    create: () => Promise.resolve(history.create),
    delete: () => Promise.resolve()
  },
};