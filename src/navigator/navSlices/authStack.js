import React, { useEffect, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStorageItem } from '../../constants';

import WelcomeScreen from '../../screens/welcomeScreen';
import Login from '../../screens/login';

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
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}

export default AuthStack;
