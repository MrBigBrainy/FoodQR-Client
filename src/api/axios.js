import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://foodqr-server.onrender.com/api',
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
