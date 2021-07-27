import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'http://music.eleuu.com',
  timeout: 5000
});

instance.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err);
});

instance.interceptors.response.use(result => {
  return result.status === 200 ? result.data : result;
}, err => {
  return Promise.reject(err);
});

export default instance;