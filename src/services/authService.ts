import axios from 'axios';
import { Endpoints } from '../type/endpoints';

const loginPost = async({email, password}: Endpoints.Login.Request) => {
  const response = await axios.post<Endpoints.Login.Response>('auth/signin', {email, password});
  return response.data;
};

const signUp = async({name, email, password}: Endpoints.SignUp.Request) => {
  const response = await axios.post<Endpoints.SignUp.Response>('auth/signup', {name, email, password});
  return response.data;
};

const authService = {
  loginPost,
  signUp,
}

export default authService;