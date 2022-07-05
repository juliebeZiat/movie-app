import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  token: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSubmit: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      axios.defaults.headers.common = {'Authorization': `Bearer ${state.token}`};
    },
  },
});

export const { loginSubmit, logout, setToken } = authSlice.actions;

export default authSlice;
