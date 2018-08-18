import axios from 'axios';

const root = 'http://192.168.1.137:4000';

export default {
  songs: {
    fetch: () => axios.get(`${root}/api/songs/`).then(res => res.data),
    create: data => axios.post(`${root}/api/songs/create/`, data).then(res => res.data),
    delete: id => axios.post(`${root}/api/songs/delete/${id}`).then(res => res.data),
    update: data => axios.post(`${root}/api/songs/update/`, data).then(res => res.data),
  },
  authors: {
    fetch: () => axios.get(`${root}/api/authors/`).then(res => res.data),
    create: name => axios.post(`${root}/api/authors/create/`, { name }).then(res => res.data),
  },
  history: {
    fetch: () => axios.get(`${root}/api/history/`).then(res => res.data),
    create: data => axios.post(`${root}/api/history/create/`, data).then(res => res.data),
    delete: id => axios.post(`${root}/api/history/delete/${id}`).then(res => res.data),
  },
};