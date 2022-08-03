import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {AppNotification} from '@util';

const Splash = () => {
  const {removeBadge} = AppNotification;
  const token = useSelector((state: any) => state?.auth?.token);
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const navigation = useNavigation<any>();
  var timer: any;

  useEffect(() => {
    timer = setTimeout(() => {
      if (token) {
        if (idCompany) {
          // navigation.navigate(ROUTE_NAME.TAB_SCREEN);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ROUTE_NAME.TAB_SCREEN}],
            }),
          );
        } else {
          // navigation.navigate(ROUTE_NAME.SELECT_COMPANY);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ROUTE_NAME.SELECT_COMPANY}],
            }),
          );
        }
      } else {
        removeBadge();
        // navigation.navigate(ROUTE_NAME.LOGIN);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTE_NAME.LOGIN}],
          }),
        );
      }
    }, 1700);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./splash.gif')} style={styles.image} />
    </View>
  );
};

export {Splash};
