import axios from "axios";

const fetchMovieService = async (movieId: string, token: string | null) => {
  const response = await axios.get(`movies/${movieId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response;
};

export default fetchMovieService;