import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSubmit: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      axios.defaults.headers.common = {'Authorization': `Bearer ${state.token}`};
    }
  },
});

export const { loginSubmit, logout, setToken } = authSlice.actions;

export default authSlice;
