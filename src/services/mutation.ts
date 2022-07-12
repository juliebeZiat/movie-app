import { useMutation } from "react-query";
import authService from "./authService";

//! DONT WORK
export const loginMutation = (email: string, password: string) => {
  return useMutation(
    async (data: { email: string; password: string }) =>
      await authService.loginPost({ email: data.email, password: data.password })
  );
};