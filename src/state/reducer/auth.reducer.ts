import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface authState {
  isLoggedIn: boolean,
  token: string | undefined,
  darkTheme: boolean,
}

const initialState: authState = {
  isLoggedIn: false,
  token: undefined,
  darkTheme: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      axios.defaults.headers.common = {'Authorization': `Bearer ${state.token}`};
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      axios.defaults.headers.common = {};
    },
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    }
  },
});

export const { login, logout, toggleTheme } = authSlice.actions;

export default authSlice;
