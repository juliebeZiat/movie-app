import { useMutation } from "react-query";
import userService from "./userService";

export const useAddMovie = () => {
  return useMutation(
    async (movie: { movieId: string }) => await userService.addMovie(movie)
  );
}