import React, { useEffect, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NOT_FIRST_TIME } from 'src/appConstants';
import { getStorageItem } from 'src/helpers';

import DocVerification from 'src/screens/signup/docVerification';
import OTP from 'src/screens/signup/otp';
import Login from 'src/screens/login';
import Signup from 'src/screens/signup';
import WelcomeScreen from 'src/screens/welcomeScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
    // props
    const [ready, setready] = useState(false);
    const notFirstTime = useRef(false);

    useEffect(() => {
        async function effect() {
            notFirstTime.current = await getStorageItem(NOT_FIRST_TIME);
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
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="otp" component={OTP} />
            <Stack.Screen name="docVerification" component={DocVerification} />
        </Stack.Navigator>
    );
}

export default AuthStack;
