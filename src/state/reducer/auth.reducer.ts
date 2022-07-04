import { createSlice } from '@reduxjs/toolkit';

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
    },
    getToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { loginSubmit, logout, getToken } = authSlice.actions;

export default authSlice;
