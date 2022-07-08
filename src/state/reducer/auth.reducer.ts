import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface authState {
  isLoggedIn: boolean,
  token: string | undefined,
  theme: keyof typeof THEMES,
}

export enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const initialState: authState = {
  isLoggedIn: false,
  token: undefined,
  theme: 'SYSTEM',
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
    // toggleTheme: (state) => {
    //   state.darkTheme = !state.darkTheme;
    // },
    setTheme: (state: RootState, { payload }: PayloadAction<authState["theme"]>) => {
      state.theme = payload;
    }
  },
});

export const themeSelector = (state: RootState): authState["theme"] => state.auth.theme;

export const { login, logout, toggleTheme, setTheme } = authSlice.actions;

export default authSlice;
