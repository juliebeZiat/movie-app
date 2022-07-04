import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export default function authHeader() {
  const token = useSelector((state) => state.auth.token);
  const user = JSON.parse(AsyncStorage.getItem('token'));
  if (user && token) {
    return { Authorization: `Bearer ${user.accessToken}` };
  }
  return {};
}
