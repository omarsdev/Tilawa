import axios from 'axios';
import { getData } from '../utils';

export const API_BASE = 'https://tilawa.orkabit.com/api/';
// export const API_BASE = 'http://89.233.108.199:4999/api/';
// export const API_BASE = 'http://127.0.0.1:4999/api/';

export const AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(async function (config) {
  const token = await getData('token');

  if (token) {
    config.headers.Authorization = 'Bearer ' + JSON.parse(token).token;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    console.log(error.response)
    return Promise.reject(error);
  },
);