import { Movie } from "./movie";

interface IQueryMovie {
  data: Movie;
  isError?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  error?: boolean;
}

interface IQueryAllMovies {
  data: Movie[];
  isError?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  error?: boolean;
}