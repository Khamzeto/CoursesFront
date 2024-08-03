import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token added to request:', token);
  } else {
    console.log('No token found in localStorage');
  }
  return config;
});

export default $api;
