import axios from 'axios';

export default {
  songs: {
    fetch: () => axios.get('http://localhost:4000/api/songs/').then(res => res.data),
    create: data => axios.post('http://localhost:4000/api/songs/create/', data).then(res => res.data),
    delete: id => axios.post(`http://localhost:4000/api/songs/delete/${id}`).then(res => res.data),
    update: data => axios.post('http://localhost:4000/api/songs/update/', data).then(res => res.data),
  },
};