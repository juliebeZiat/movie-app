import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface authState {
  isLoggedIn: boolean,
  token: string | undefined,
}


const initialState: authState = {
  isLoggedIn: false,
  token: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.token = payload;
      axios.defaults.headers.common = {'Authorization': `Bearer ${state.token}`};
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      axios.defaults.headers.common = {};
    }
  },
});

export const logSelector = (state: RootState) => state.auth.isLoggedIn;

export const { login, logout } = authSlice.actions;

export default authSlice;
