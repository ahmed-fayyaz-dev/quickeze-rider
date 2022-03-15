import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {store, persistor} from './src/redux/store';
import AppNavigator from './src/navigator/navigation';
import {settings} from './settings';

settings;

function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
