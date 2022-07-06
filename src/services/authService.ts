import axios from 'axios';
import { Endpoints } from '../type/endpoints';

const loginPost = async({email, password}: Endpoints.Login.Request) => {
  const response = await axios.post<Endpoints.Login.Response>('auth', {email, password});
  return response.data;
};

const authService = {
  loginPost
}

export default authService;