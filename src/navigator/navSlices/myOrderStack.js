import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyOrders from 'src/screens/myOrders';

const Stack = createNativeStackNavigator();

function MyOrderStack() {
    return (
        <Stack.Navigator
            initialRouteName={'My Orders'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="myOrders" component={MyOrders} />
        </Stack.Navigator>
    );
}

export default MyOrderStack;
