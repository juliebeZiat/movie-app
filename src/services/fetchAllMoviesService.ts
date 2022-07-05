import axios from "axios";

const fetchAllMoviesService = async (token: string | null) => {
  const response = await axios.get('movies/popular', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response;
};

export default fetchAllMoviesService;
