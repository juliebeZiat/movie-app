import axios from "axios";
import { Endpoints } from "../type/endpoints";

const fetchUserList = async () => {
  const response = await axios.get<Endpoints.GetUserList.Response>(`movie/list`);
  return response;
};

const addMovie = async ({movieId}: Endpoints.AddMovie.Request) => {
  const response = await axios.put<Endpoints.AddMovie.Response>('movie/list', {movieId});
  return response;
}

const removeMovie = async ({movieId}: Endpoints.RemoveMovie.Request) => {
  const response = await axios.delete<Endpoints.RemoveMovie.Response>('movie/list', {data: {movieId}});
  return response;
}

const userService = {
  fetchUserList,
  addMovie,
  removeMovie,
};

export default userService;