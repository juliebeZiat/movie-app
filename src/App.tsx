import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Navigation from './navigation/Navigation';
import { store } from './state/store';
import InitProvider from './contexts/InitProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

let persistor = persistStore(store);
const queryClient = new QueryClient;

const App: FC = () =>  {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InitProvider>
            <Navigation />
          </InitProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
