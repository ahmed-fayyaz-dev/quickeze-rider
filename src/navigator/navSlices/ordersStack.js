import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Orders from 'src/screens/orders';

const Stack = createNativeStackNavigator();

function AuthStack() {
    const [ready, setready] = useState(false);

    useEffect(() => {
        async function effect() {
            setready(true);
        }
        effect();
    }, []);

    if (!ready) {
        return null;
    }
    return (
        <Stack.Navigator
            initialRouteName={'orders'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="orders" component={Orders} />
        </Stack.Navigator>
    );
}

export default AuthStack;
