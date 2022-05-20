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
  const {
    chatUser,
    idRoomChat,
    getConvertedMessages,
    listChat,
    deleteMsg,
    dataDetail,
  } = useFunction(props);
  const navigation = useNavigation<any>();
  const navigateToDetail = () => {
    navigation.navigate(ROUTE_NAME.INFO_ROOM_CHAT, {idRoomChat: idRoomChat});
  };

  const renderMessage = (props: any) => {
    return (
      <>
        <ItemMessage
          {...props}
          deleteMsg={(id: any) => {
            deleteMsg(id);
          }}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        back
        title={dataDetail?.name}
        imageCenter
        iconRightFirst={iconDetail}
        iconRightSecond={iconSearch}
        onRightFirst={navigateToDetail}
        onRightSecond={() => {}}
      />
      <GiftedChat
        placeholder="Type something..."
        messagesContainerStyle={{marginBottom: 20}}
        messages={getConvertedMessages(listChat)}
        // messages={dataTest}
        onSend={(messages: any) => {}}
        renderMessage={renderMessage}
        user={chatUser}
      />
    </View>
  );
};

export {DetailChat};
