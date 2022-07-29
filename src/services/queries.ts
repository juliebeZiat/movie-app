import { useQuery } from "react-query";
import { IQueryAllMovies, IQueryMovie } from "../type/queries";
import movieService from "./movieService";
import userService from "./userService";

export const useFetchMovieQuery = (movieId: string) => {
  return useQuery<IQueryMovie, Error>(
    ["movie", movieId],
    async () => await movieService.fetchMovieService(movieId)
  );
}

export const useFetchAllMoviesQuery = () => {
  return useQuery<IQueryAllMovies, Error>(
    ["movies"],
    async () => await movieService.fetchAllMoviesService()
  );
}

export const useFetchUserList = () => {
  return useQuery(
    ["userList"],
    async () => await userService.fetchUserList()
  );
}
