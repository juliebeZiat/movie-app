import axios from "axios";
import { Endpoints } from "../type/endpoints";

const fetchMovieService = async (movieId: string, token: string | undefined) => {
  const response = await axios.get<Endpoints.GetMovie.Response>(`movies/${movieId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response;
};

const fetchAllMoviesService = async () => {
  const response = await axios.get<Endpoints.ListMovies.Response>('movies/popular');
  return response;
};

const movieService = {
  fetchMovieService,
  fetchAllMoviesService
};

export default movieService;