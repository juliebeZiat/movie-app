import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setUserList } from "../state/reducer/movie.reducer";
import { IQueryAllMovies, IQueryMovie } from "../type/queries";
import authService from "./authService";
import movieService from "./movieService";
import userService from "./userService";

export const useFetchMovieQuery = (movieId: string) => {
  return useQuery<IQueryMovie, Error>(
    ["movie", movieId],
    async () => await movieService.fetchMovieService(movieId),
    {
      onSuccess(data) {
        return data;
      }
    }
  );
}

export const useFetchAllMoviesQuery = () => {
  return useQuery<IQueryAllMovies, Error>(
    ["movies"],
    async () => await movieService.fetchAllMoviesService()
  );
}

export const useFetchUserList = () => {
  const dispatch = useDispatch();
  return useQuery(
    ["userList"],
    async () => await userService.fetchUserList(),
    {
      onSuccess(data) {
        dispatch(setUserList(data.data.list.moviesIds));
        return data;
      },
    }
  );
}

export const useFetchUserDetails = () => {
  return useQuery(
    ["userDetails"],
    async () => await authService.userDetails(),
    {
      onSuccess(data) {
        return data;
      }
    }
  )
}
