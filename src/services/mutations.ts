import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { addMovieInList, removeMovieInList } from "../state/reducer/movie.reducer";
import authService from "./authService";
import userService from "./userService";

export const useMutationSignIn = () => {
  return useMutation(
    async (data: { email: string; password: string }) =>
      await authService.signIn({
        email: data.email,
        password: data.password,
      })
  );
};

export const useMutationSignUp = () => {
  return useMutation(
    async (data: { username: string; email: string; password: string }) =>
      await authService.signUp({
        name: data.username,
        email: data.email,
        password: data.password,
      })
  );
};

export const useMutationAddMovie = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    async(movieId: string) => await userService.addMovie({movieId}),
    {
      onSuccess: (movieId) => {
        dispatch(addMovieInList(movieId));
        queryClient.invalidateQueries(["userList"]);
      }
    }
  )
};

export const useMutationRemoveMovie = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    async(movieId: string) => await userService.removeMovie({movieId}),
    {
      onSuccess: (movieId) => {
        dispatch(removeMovieInList(movieId));
        queryClient.invalidateQueries(["userList"]);
      }
    }
  )
};