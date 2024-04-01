import axios from 'axios';
import { API_URL } from 'constants/env';
import { store } from 'store';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const API = {
  login: data => axiosInstance.post('/api/v1/consumers/otp/send', data),
  verifyPhoneNumber: data => axiosInstance.post('/api/v1/consumers/otp/check', data),
  createAccount: data => axiosInstance.post('/api/v1/consumers/me', data),
};
