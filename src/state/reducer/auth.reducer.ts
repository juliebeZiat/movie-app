import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { loginSubmit } = authSlice.actions;

export default authSlice;
