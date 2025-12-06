import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';
import { setAuthorizationStatus } from '../store/action';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

// Lazy getter to avoid circular dependency
let storeModule: typeof import('../store') | null = null;

const getStore = () => {
  if (!storeModule) {
    // Use dynamic import to break circular dependency
    // This will be resolved when the interceptor is actually called
    storeModule = require('../store') as typeof import('../store');
  }
  return storeModule?.store;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Access store lazily to break circular dependency
        // The store will be available when this interceptor runs
        const store = getStore();
        if (store) {
          store.dispatch(setAuthorizationStatus('NO_AUTH'));
        }
      }
      throw error;
    }
  );

  return api;
};
