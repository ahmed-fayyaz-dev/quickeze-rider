import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard2 from 'src/screens/dashboard2';

const Stack = createNativeStackNavigator();

function Dashboard2Stack() {
    return (
        <Stack.Navigator
            initialRouteName={'dashboard2'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="dashboard2" component={Dashboard2} />
        </Stack.Navigator>
    );
}

export default Dashboard2Stack;
