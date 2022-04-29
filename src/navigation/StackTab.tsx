import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTE_NAME} from './routeName';
import {screens} from '../screens';

import {Tabbar} from '@component';

const Tab = createBottomTabNavigator();

const StackTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={ROUTE_NAME.LISTCHAT_SCREEN}
        component={screens.ListChat}
      />
      <Tab.Screen name={ROUTE_NAME.USER_SCREEN} component={screens.User} />
      <Tab.Screen
        name={ROUTE_NAME.SETTING_SCREEN}
        component={screens.Setting}
      />
    </Tab.Navigator>
  );
};

export default StackTab;
