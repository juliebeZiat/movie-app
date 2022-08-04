import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface appState {
  theme: keyof typeof THEMES,
}

export enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const initialState: appState = {
  theme: 'SYSTEM',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<appState["theme"]>) => {
      state.theme = payload;
    },
  }
});

export const themeSelector = (state: RootState): appState["theme"] => state.app.theme;

export const { setTheme } = appSlice.actions;

export default appSlice;