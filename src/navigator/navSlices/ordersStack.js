import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Orders from 'src/screens/orders';

const Stack = createNativeStackNavigator();

function OrderStack() {
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

export default OrderStack;
