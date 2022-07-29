import axios from "axios";
import { Endpoints } from "../type/endpoints";

const fetchUserList = async () => {
  const response = await axios.get<Endpoints.GetMovie.Response>(`movie/list`);
  return response;
};

const userService = {
  fetchUserList,
};

export default userService;