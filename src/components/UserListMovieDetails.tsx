import { FC } from "react";
import { useQuery } from "react-query";
import movieService from "../services/movieService";

const UserListMovieDetails: FC = ({ movieId }) => {
  useQuery(
    ["movie", movieId],
    async () => await movieService.fetchMovieService(movieId)
  )
  return null;
}

export default UserListMovieDetails;