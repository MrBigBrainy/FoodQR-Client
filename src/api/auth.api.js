import api from './axios';

export async function registerAdmin(data) {
  return api.post(`/auth/register`, data);
}

export async function loginAdmin(data) {
  return api.post(`/auth/login`, data);
}
