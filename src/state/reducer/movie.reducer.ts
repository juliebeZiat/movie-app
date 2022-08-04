import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface movieState {
  isMovieInList: boolean,
  movie: number | undefined,
  movies: number[],
}

const initialState: movieState = {
  isMovieInList: false,
  movie: undefined,
  movies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setUserList: (state, { payload }: PayloadAction<movieState["movies"]>) => {
      state.movies = payload;
    },
    addMovieInList: (state, { payload }) => {
      state.isMovieInList = true;
      state.movie = payload;
      state.movies.push(payload);
    },
    removeMovieInList: (state, { payload }) => {
      state.isMovieInList = false;
      state.movie = payload;
      state.movies.filter(item => item !== payload);
    },
  }
});

export const movieSelector = (state: RootState, movieId: number) => state.movie.movies.includes(movieId);

export const { addMovieInList, removeMovieInList, setUserList } = movieSlice.actions;

export default movieSlice;