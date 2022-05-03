import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import NavigationApp from './src/navigation/StackContainer';
import {NavigationUtils} from '@navigation';

import {store, persistor} from './src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationApp
            ref={(navigatorRef: any) =>
              NavigationUtils.setTopLevelNavigator(navigatorRef)
            }
          />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
