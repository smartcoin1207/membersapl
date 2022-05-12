import React, {useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import {iconSearch, iconDetail} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useFunction} from './useFunction';

const DetailChat = (props: any) => {
  const {dataTest} = useFunction(props);
  console.log(dataTest)
  const {route} = props;
  const {idRoomChat} = route?.params;
  const navigation = useNavigation<any>();
  const navigateToDetail = () => {
    navigation.navigate(ROUTE_NAME.INFO_ROOM_CHAT, {idRoomChat: idRoomChat});
  };

  return (
    <View style={styles.container}>
      <Header
        back
        title="チャットグループ名"
        imageCenter
        iconRightFirst={iconDetail}
        iconRightSecond={iconSearch}
        onRightFirst={navigateToDetail}
        onRightSecond={() => {}}
      />
      <View>
        <Text>Detail chat</Text>
      </View>
    </View>
  );
};

export {DetailChat};
