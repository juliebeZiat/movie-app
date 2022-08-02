import { useQueries, useQuery } from "react-query";
import { useQueriesTyped } from "../hooks/useQueryTyped";
import { IQueryAllMovies, IQueryMovie } from "../type/queries";
import { TUserList } from "../type/userlist";
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
  return useQuery(
    ["userList"],
    async () => await userService.fetchUserList(),
    {
      onSuccess(data) {
        return data;
      },
    }
  );
}

export const useMovieDetailsForUserList = (userList: TUserList) => {
  return useQueriesTyped(
    userList?.list.movies.map((movie: {movie: string}) => {
      return {
        queryKey: ["movie", movie.movie],
        queryFn: async () => await movieService.fetchMovieService(movie.movie),
        enabled: !!userList,
      };
    }) ?? []
  );
}
