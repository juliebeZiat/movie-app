import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface appState {
  theme: keyof typeof THEMES,
  isMovieInList: boolean,
  movie: number | undefined,
  movies: number[],
}

export enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}


const initialState: appState = {
  theme: 'SYSTEM',
  isMovieInList: false,
  movie: undefined,
  movies: [],
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state: RootState, { payload }: PayloadAction<appState["theme"]>) => {
      state.theme = payload;
    },
    setUserList: (state, action) => {
      state.movies = action.payload;
    },
    addMovieInList: (state, action) => {
      state.isMovieInList = true;
      state.movie = action.payload;
      state.movies.push(action.payload);
    },
    removeMovieInList: (state, action) => {
      state.isMovieInList = false;
      state.movie = action.payload;
      state.movies.filter(item => item !== action.payload);
    },
  }
});

// export const movieSelector = (state: RootState, movieId) => state.app.isMovieInList.find(movie => movie._id == movieId);
export const themeSelector = (state: RootState): appState["theme"] => state.app.theme;

export const { setTheme, addMovieInList, removeMovieInList, setUserList } = appSlice.actions;

export default appSlice;