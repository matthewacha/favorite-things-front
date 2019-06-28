import axios from 'axios';
// const url = 'https://favorite-things-back.herokuapp.com'
export default () => axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
