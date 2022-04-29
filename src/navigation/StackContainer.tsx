import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screens} from '../screens';
import {ROUTE_NAME} from './routeName';

const Stack = createNativeStackNavigator();

const NavigationApp = () => {
  const screenOptions = {
    headerShown: false,
  };
  const renderStackApp = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={ROUTE_NAME.LOGIN} component={screens.Login} />
      </Stack.Navigator>
    );
  };
  return <NavigationContainer>{renderStackApp()}</NavigationContainer>;
};

export default NavigationApp;
