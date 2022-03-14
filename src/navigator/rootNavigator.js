import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';

import AuthStack from './navSlices/authStack';
import DrawerNav from './drawerNav';

const Stack = createNativeStackNavigator();

const RootNavigator = ({
  loggedIn,
  // ...props
}) => {
  return (
    <Stack.Navigator
      initialRouteName={loggedIn.current ? 'drawerNav' : 'authStack'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="authStack" component={AuthStack} />
      <Stack.Screen name="drawerNav" component={DrawerNav} />
    </Stack.Navigator>
  );
};

function mapStateToProps({submitLoginReducer}) {
  return {submitLoginReducer};
}
export default connect(mapStateToProps, {})(RootNavigator);
