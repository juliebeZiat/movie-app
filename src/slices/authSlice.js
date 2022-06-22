import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSubmit: (state) => {
      state.logged = true;
    },
  },
});

export const { loginSubmit } = authSlice.actions;

export default authSlice;
