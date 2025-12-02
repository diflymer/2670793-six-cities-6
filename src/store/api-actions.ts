import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import type { AxiosInstance } from 'axios';
import { setAuthorizationStatus, setUser } from './slices';
import type { AppDispatch } from '../types/state';
import { dropToken, saveToken } from '../api/token';
import type { LoginData, AuthInfo } from '../types/auth';

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_arg, { extra: api, dispatch }) => {
  // dispatch(setOffersLoading(true));
  // try {
  //   const { data } = await api.get<Offer[]>('/offers');
  //   dispatch(loadOffers(data));
  //   dispatch(setOffersLoading(false));
  // } catch (error) {
  //   dispatch(setOffersLoading(false));
  //   throw error;
  // }
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});

export const login = createAsyncThunk<
  AuthInfo,
  LoginData,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>('user/login', async (loginData, { extra: api }) => {
  // try {
  //   const { data } = await api.post<AuthInfo>('/login', loginData);
  //   saveToken(data.token);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { token, ...user } = data;
  //   dispatch(setUser(user));
  //   dispatch(setAuthorizationStatus('AUTH'));
  // } catch (error) {
  //   dispatch(setUser(null));
  //   dispatch(setAuthorizationStatus('NO_AUTH'));
  //   throw error;
  // }
  const { data } = await api.post<AuthInfo>('/login', loginData);
  saveToken(data.token);
  return data;
});

export const checkAuth = createAsyncThunk<
  AuthInfo,
  undefined,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  // try {
  //   const { data } = await api.get<AuthInfo>('/login');
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { token, ...user } = data;
  //   dispatch(setUser(user));
  //   dispatch(setAuthorizationStatus('AUTH'));
  // } catch (error) {
  //   dispatch(setUser(null));
  //   dispatch(setAuthorizationStatus('NO_AUTH'));
  //   throw error;
  // }
  const { data } = await api.get<AuthInfo>('/login');
  return data;
});

export const logout = () => (dispatch: AppDispatch) => {
  dropToken();
  dispatch(setUser(null));
  dispatch(setAuthorizationStatus('NO_AUTH'));
};
