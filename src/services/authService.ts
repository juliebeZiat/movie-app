import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginPost = async({email, password}: {email: string, password: string}) => {
  const response = await axios.post('auth', {email, password});
  if (response.data.access_token) {
    AsyncStorage.setItem('user', JSON.stringify(response.data))
  }
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