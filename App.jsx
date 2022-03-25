import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { settings } from './settings';
import AppNavigator from './src/navigator/navigation';
import { store, persistor } from './src/redux/store';

settings;

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <StoreProvider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <AppNavigator />
                    </PersistGate>
                </StoreProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

// export default Sentry.wrap(App);
export default App;
