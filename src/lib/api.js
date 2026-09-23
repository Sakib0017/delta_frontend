import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({ baseURL: `${API}/api`, withCredentials: true });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('delta_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const imgUrl = (p) => {
  if (!p) return '';
  if (/^https?:\/\//.test(p)) return p;
  return `${API}/${String(p).replace(/^\//, '')}`;
};

export default api;
