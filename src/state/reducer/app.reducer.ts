import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface appState {
  theme: keyof typeof THEMES,
  isMovieInList: boolean,
}

export enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const initialState: appState = {
  theme: 'SYSTEM',
  isMovieInList: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state: RootState, { payload }: PayloadAction<appState["theme"]>) => {
      state.theme = payload;
    },
    addMovieInList: (state) => {
      state.isMovieInList = true;
    },
    removeMovieInList: (state) => {
      state.isMovieInList = false;
    },
  }
});

export const themeSelector = (state: RootState): appState["theme"] => state.app.theme;

export const { setTheme, addMovieInList, removeMovieInList } = appSlice.actions;

export default appSlice;