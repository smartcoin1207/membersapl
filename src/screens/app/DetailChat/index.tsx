import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import {iconSearch, iconDetail} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useFunction} from './useFunction';
import {Menu} from 'react-native-material-menu';
import {GiftedChat, Message} from '../../../lib/react-native-gifted-chat';
import {ItemMessage} from './components/ItemMessage';

const DetailChat = (props: any) => {
  const {dataTest, chatUser, idRoomChat, visible, onShowMenu} =
    useFunction(props);
  const navigation = useNavigation<any>();
  const navigateToDetail = () => {
    navigation.navigate(ROUTE_NAME.INFO_ROOM_CHAT, {idRoomChat: idRoomChat});
  };
  const renderMessage = (props: any) => {
    return (
      <>
        <ItemMessage {...props} />
      </>
    );
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
      <GiftedChat
        placeholder="Type something..."
        messagesContainerStyle={{paddingBottom: 30}}
        messages={dataTest}
        onSend={(messages: any) => {}}
        renderMessage={renderMessage}
        user={chatUser}
      />
    </View>
  );
};

export {DetailChat};
