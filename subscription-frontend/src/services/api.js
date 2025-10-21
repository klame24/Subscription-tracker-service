import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password) => api.post('/auth/signup', { email, password }),
};

export const subscriptionAPI = {
  getAll: () => api.get('/subscriptions'),
  create: (subscription) => api.post('/subscriptions', subscription),
  update: (id, subscription) => api.put(`/subscriptions/${id}`, subscription),
  delete: (id) => api.delete(`/subscriptions/${id}`),
};

export default api;