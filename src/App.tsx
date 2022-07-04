import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Navigation from './navigation/Navigation';
import axios from 'axios';
import { API_URL } from '@env';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

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
