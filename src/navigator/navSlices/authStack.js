import React, { useEffect, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStorageItem } from 'src/helpers';

import Login from 'src/screens/login';
import WelcomeScreen from 'src/screens/welcomeScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
    // props
    const [ready, setready] = useState(false);
    const notFirstTime = useRef(false);

    useEffect(() => {
        async function effect() {
            notFirstTime.current = await getStorageItem('notFirstTime');
            setready(true);
        }
        effect();
    }, []);

    if (!ready) {
        return null;
    }
    return (
        <Stack.Navigator
            initialRouteName={notFirstTime.current ? 'login' : 'welcome'}
            screenOptions={{
                headerShown: false,
                headerTintColor: 'red',
                headerMode: 'float',
            }}>
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
    );
}

export default AuthStack;
