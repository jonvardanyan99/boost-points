import axios from 'axios';

import { API_URL, REFRESH_TOKEN_URL } from '~/constants/env';
import { store } from '~/store';
import { resetStore } from '~/store/slices/app/actions';
import { setTokens } from '~/store/slices/user';

import { Api } from './types';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const API: Api = {
  login: data => axiosInstance.post('/api/v1/consumers/otp/send', data),
  verifyPhoneNumber: data => axiosInstance.post('/api/v1/consumers/otp/check', data),
  refreshToken: data => axiosInstance.post(REFRESH_TOKEN_URL as string, data),
  getAccount: () => axiosInstance.get('/api/v1/consumers/me'),
  createAccount: data => axiosInstance.post('/api/v1/consumers/me', data),
  patchAccount: data => axiosInstance.patch('/api/v1/consumers/me', data),
  getId: () => axiosInstance.get('/api/v1/consumers/me/id'),
  addId: data => axiosInstance.post('/api/v1/consumers/me/id', data),
  getSignLink: () => axiosInstance.get('/api/v1/file-link/consumer.signs'),
  getDisputeLink: () => axiosInstance.get('/api/v1/file-link/consumer.disputes'),
  signConsentForm: data => axiosInstance.post('/api/v1/consumers/me/consent-form', data),
  getReport: ({ agency }) => axiosInstance.get(`/api/v1/consumers/report/${agency}`),
  getCreditScores: () => axiosInstance.get('/api/v1/consumers/me/credit-scores'),
  getIssue: ({ uuid }) => axiosInstance.get(`/api/v1/consumers/issues/${uuid}`),
  getIssues: () => axiosInstance.get('/api/v1/consumers/issues'),
  getIssueFurtherOptions: ({ uuid }) =>
    axiosInstance.get(`/api/v1/consumers/issues/further-options?dispute_uuid=${uuid}`),
  getSubscription: () => axiosInstance.get('/api/v1/consumers/subscriptions'),
  activateSubscription: data => axiosInstance.post('/api/v1/consumers/subscriptions', data),
  getSubscriptionPlans: () => axiosInstance.get('/api/v1/consumers/subscriptions/plans'),
  getDispute: ({ uuid }) => axiosInstance.get(`/api/v1/consumers/disputes/${uuid}`),
  createDispute: data => axiosInstance.post('/api/v1/consumers/disputes', data),
  getDisputes: () => axiosInstance.get('/api/v1/consumers/disputes'),
  sendDisputeAction: ({ uuid, action, data }) =>
    axiosInstance.post(`/api/v1/consumers/disputes/${uuid}/${action}`, data),
  updatePaymentMethod: data => axiosInstance.post('/api/v1/consumers/me/payment-method', data),
};

let refreshingToken = false;
let refreshTokenPromise: Promise<'success'>;
let refreshTokenPromiseResolver: (value: 'success' | PromiseLike<'success'>) => void;

axiosInstance.interceptors.request.use(async config => {
  if (refreshingToken && config.url !== REFRESH_TOKEN_URL) {
    await refreshTokenPromise;
  }

  const state = store.getState();
  const tokens = state.user.tokens;

  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && error.response?.config.url !== REFRESH_TOKEN_URL) {
      if (refreshingToken) {
        return axiosInstance(error.config);
      }

      refreshingToken = true;
      refreshTokenPromise = new Promise(resolve => {
        refreshTokenPromiseResolver = resolve;
      });

      const state = store.getState();
      const tokens = state.user.tokens;

      try {
        if (tokens) {
          const response = await API.refreshToken({
            credentials: tokens.refresh,
          });

          store.dispatch(
            setTokens({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            }),
          );
        }
      } catch (e) {
        store.dispatch(resetStore());

        return await Promise.reject(e);
      } finally {
        refreshingToken = false;
        refreshTokenPromiseResolver('success');
      }

      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  },
);
