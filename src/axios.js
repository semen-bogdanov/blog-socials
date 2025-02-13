import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444/',
});
// 3:10:00 Есть токен или нет (проверка)
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
