import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Navigation from './navigation/Navigation';
import axios from 'axios';
import { API_URL } from '@env';

const App: FC = () =>  {
  
  useEffect(() => {
    axios.defaults.baseURL = API_URL;
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
