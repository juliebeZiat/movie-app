import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://tt-nextjs-env.eba-nbwxzcqn.eu-west-3.elasticbeanstalk.com';

const login = (userEmail, userPassword) => (
  axios
    .post(API_URL`${'/auth'}`, {
      userEmail,
      userPassword,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(response.data);
        AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    }));

const authService = {
  login,
};

export default authService;

// async await
// BASE API .env + conc.
