import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screens} from '../screens';
import {ROUTE_NAME} from './routeName';
import {useSelector} from 'react-redux';
import StackTab from './StackTab';

const Stack = createNativeStackNavigator();

const NavigationApp = React.forwardRef((props: any, ref: any) => {
  const screenOptions = {
    headerShown: false,
  };

  let token = useSelector((state: any) => state?.auth?.token);

  const renderStackApp = () => {
    if (!token) {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={ROUTE_NAME.LOGIN} component={screens.Login} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={ROUTE_NAME.TAB_SCREEN} component={StackTab} />
          <Stack.Screen
            name={ROUTE_NAME.CREATE_ROOM_CHAT}
            component={screens.CreateRoomChat}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_CHAT}
            component={screens.DetailChat}
          />
          <Stack.Screen
            name={ROUTE_NAME.INFO_ROOM_CHAT}
            component={screens.InfoRoomChat}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_USER}
            component={screens.ListUser}
          />
          <Stack.Screen
            name={ROUTE_NAME.EDIT_ROOM_CHAT}
            component={screens.EditRoomChat}
          />
        </Stack.Navigator>
      );
    }
  };
  return (
    <NavigationContainer ref={ref}>{renderStackApp()}</NavigationContainer>
  );
});

export default NavigationApp;
