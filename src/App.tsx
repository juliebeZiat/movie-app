import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { API_URL } from '@env';
import Navigation from './navigation/Navigation';
import { store } from './state/store';

let persistor = persistStore(store);

const App: FC = () =>  {
  
  useEffect(() => {
    axios.defaults.baseURL = API_URL;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
