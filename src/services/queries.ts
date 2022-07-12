import { useQuery } from "react-query";
import { IQueryAllMovies, IQueryMovie } from "../type/queries";
import movieService from "./movieService";

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
