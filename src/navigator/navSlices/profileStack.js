import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AttachPaymentMethod from 'src/screens/profile/components/attachPayment';
import EditProfile from 'src/screens/profile/components/editProfile';
import Profile from 'src/screens/profile';

const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName={'profile'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="editProfile" component={EditProfile} />

            <Stack.Screen
                name="attachPaymentMethod"
                component={AttachPaymentMethod}
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;
