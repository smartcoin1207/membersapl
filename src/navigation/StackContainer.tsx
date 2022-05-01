import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screens} from '../screens';
import {ROUTE_NAME} from './routeName';
import {useSelector} from 'react-redux';
import StackTab from './StackTab';

const Stack = createNativeStackNavigator();

const NavigationApp = () => {
  const screenOptions = {
    headerShown: false,
  };

  let token = useSelector((state: any) => state?.demo?.number);

  const renderStackApp = () => {
    if (token === 0) {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={ROUTE_NAME.LOGIN} component={screens.Login} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name={ROUTE_NAME.TAB_SCREEN}
            component={StackTab}
            options={{gestureEnabled: false}}
          />
        </Stack.Navigator>
      );
    }
  };
  return <NavigationContainer>{renderStackApp()}</NavigationContainer>;
};

export default NavigationApp;
