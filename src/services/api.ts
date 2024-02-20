import Axios from 'axios';

const urls = {
  test: `http://localhost:4000`,
  development: 'http://localhost:4000/',
  production: 'https://api.insomniaspace.com/',
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const apiRoot = urls[process.env.NODE_ENV];

export default api;
