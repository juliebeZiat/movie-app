import { createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

const initialState = {
  isLoggedIn: false,
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
    }
  },
});

export const { loginSubmit, logout } = authSlice.actions;

export default authSlice;
