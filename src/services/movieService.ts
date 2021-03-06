import axios from "axios";
import { Endpoints } from "../type/endpoints";

const fetchMovieService = async (movieId: string) => {
  const response = await axios.get<Endpoints.GetMovie.Response>(`movie/${movieId}`);
  return response;
};

const fetchAllMoviesService = async () => {
  const response = await axios.get<Endpoints.ListMovies.Response>('movie/popular');
  return response;
};

const movieService = {
  fetchMovieService,
  fetchAllMoviesService
};

export default movieService;