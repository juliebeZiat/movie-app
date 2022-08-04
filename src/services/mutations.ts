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

export const useMutationAddMovie = (movieId: string) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    async() => await userService.addMovie({movieId}),
    {
      onSuccess: () => {
        dispatch(addMovieInList(movieId));
        queryClient.invalidateQueries(["userList"]);
      }
    }
  )
};

export const useMutationRemoveMovie = (movieId: string) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    async() => await userService.removeMovie({movieId}),
    {
      onSuccess: () => {
        dispatch(removeMovieInList(movieId));
        queryClient.invalidateQueries(["userList"]);
      }
    }
  )
};