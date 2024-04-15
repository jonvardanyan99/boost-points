import axios from 'axios';
import { API_URL, REFRESH_TOKEN_URL } from 'constants/env';
import { store } from 'store';
import { resetStore } from 'store/reducers/app/actions';
import { setTokens } from 'store/reducers/auth/actions';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const API = {
  login: data => axiosInstance.post('/api/v1/consumers/otp/send', data),
  verifyPhoneNumber: data => axiosInstance.post('/api/v1/consumers/otp/check', data),
  refreshToken: data => axiosInstance.post(REFRESH_TOKEN_URL, data),
  getAccount: () => axiosInstance.get('/api/v1/consumers/me'),
  createAccount: data => axiosInstance.post('/api/v1/consumers/me', data),
};

let refreshingToken = false;
let refreshTokenPromise = new Promise(() => {});
let refreshTokenPromiseResolver = () => {};

axiosInstance.interceptors.request.use(async config => {
  if (refreshingToken && config.url !== REFRESH_TOKEN_URL) {
    await refreshTokenPromise;
  }

  const state = store.getState();
  const accessToken = state.auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && error.response.config.url !== REFRESH_TOKEN_URL) {
      refreshingToken = true;
      refreshTokenPromise = new Promise(resolve => {
        refreshTokenPromiseResolver = resolve;
      });

      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      try {
        const response = await API.refreshToken({
          credentials: refreshToken,
        });

        store.dispatch(
          setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }),
        );
      } catch (e) {
        store.dispatch(resetStore());

        return Promise.reject(e);
      } finally {
        refreshingToken = false;
        refreshTokenPromiseResolver('success');
      }

      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  },
);
