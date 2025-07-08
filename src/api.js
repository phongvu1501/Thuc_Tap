import axios from 'axios';
import { getToken } from './utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  // KHÔNG cần set Content-Type mặc định
});

// Gắn token nếu có
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apis = {
  login: 'user/login',
  logout: 'user/logout',
  getProduct: 'product',
  createProduct: 'product',
  searchProduct: 'product/search',
  updateProduct: 'product/:id',
  deleteProduct: 'product/:id',
  uploadImage: 'product/upload'
};

export default api;
