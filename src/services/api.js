import axios from 'axios';


export default () => axios.create({
  baseURL: 'https://favorite-things-back.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
