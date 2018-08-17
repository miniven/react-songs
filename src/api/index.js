import axios from 'axios';

export default {
  songs: {
    fetch: () => axios.get('http://localhost:4000/api/songs/').then(response => response.data),
  },
};