import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Navigation from './navigation/Navigation';
import { store } from './state/store';
import InitProvider from './contexts/InitProvider';

let persistor = persistStore(store);

const App: FC = () =>  {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitProvider>
          <Navigation />
        </InitProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
