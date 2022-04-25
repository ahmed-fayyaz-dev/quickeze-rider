import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from 'src/components/errorBoundary';

import { settings } from 'src/settings';
import AppNavigator from './src/navigator/navigation';
import { store, persistor } from './src/redux/store';

settings;

function App() {
    return (
        <ErrorBoundary>
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <StoreProvider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <AppNavigator />
                        </PersistGate>
                    </StoreProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ErrorBoundary>
    );
}

// export default Sentry.wrap(App);
export default App;

const styles = StyleSheet.create({
    container: { flex: 1 },
});
