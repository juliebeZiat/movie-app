import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginPost = async({email, password}: {email: string, password: string}) => {
  const response = await axios.post('auth', {email, password});
  return response.data;
};

const logout = () => {
  AsyncStorage.clear();
};

const authService = {
  loginPost,
  logout
}

export default authService;