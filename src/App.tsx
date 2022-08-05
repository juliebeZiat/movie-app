import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Navigation from './navigation/Navigation';
import { store } from './state/store';
import InitProvider from './contexts/InitProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SafeAreaProvider } from 'react-native-safe-area-context';

let persistor = persistStore(store);
const queryClient = new QueryClient;

const App: FC = () =>  {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <InitProvider>
              <Navigation />
            </InitProvider>
          </PersistGate>
        </ReduxProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
