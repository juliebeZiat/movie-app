import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSubmit: (state) => {
      state.isLoggedIn = true;
    },
    getToken: (state, action) => {
      state.userToken = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    }
  },
});

export const { loginSubmit, getToken, logout } = authSlice.actions;

export default authSlice;
