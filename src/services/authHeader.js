import AsyncStorage from '@react-native-async-storage/async-storage';

export default function authHeader() {
  const user = JSON.parse(AsyncStorage.getItem('token'));
  if (user && user.access_token) {
    return { Authorization: `Bearer ${user.accessToken}` };
  }
  return {};
}
