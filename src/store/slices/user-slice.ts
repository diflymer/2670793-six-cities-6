import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/auth';
import { checkAuth, login } from '../api-actions';

export type AuthorizationStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: UserState = {
  authorizationStatus: 'UNKNOWN',
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { token, ...user } = action.payload;
        state.authorizationStatus = 'AUTH';
        state.user = user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = 'NO_AUTH';
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = 'AUTH';
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = 'NO_AUTH';
        state.user = null;
      })
  },
});

export const { setAuthorizationStatus, setUser } = userSlice.actions;
export default userSlice.reducer;

