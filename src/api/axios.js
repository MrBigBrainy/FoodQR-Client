import axios from 'axios';

const api = axios.create({
  baseURL: 'https://foodqr-server.onrender.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
