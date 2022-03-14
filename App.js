import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react-native';

import configureStore from './src/redux/store';
import AppNavigator from './src/navigator/navigation';
import {settings} from './settings';

settings;

function App() {
  return (
    <StoreProvider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        {/* <StatusBar style="auto" /> */}
        <AppNavigator />
      </PersistGate>
    </StoreProvider>
  );
}

export default Sentry.wrap(App);
