// src/api.js
import axios from 'axios';
import { getToken } from './utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
});

// Interceptor: Tự động gắn token vào headers
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
