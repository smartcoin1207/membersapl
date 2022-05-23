import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import {iconSearch, iconDetail, iconDelete} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useFunction} from './useFunction';
import {Menu} from 'react-native-material-menu';
import {GiftedChat, Message} from '../../../lib/react-native-gifted-chat';
import {ItemMessage} from './components/ItemMessage';
import {renderSend} from './components/InputToolbar';

const DetailChat = (props: any) => {
  const {
    chatUser,
    idRoomChat,
    getConvertedMessages,
    listChat,
    deleteMsg,
    dataDetail,
    sendMessage,
    navigateToDetail,
    message_pinned,
  } = useFunction(props);

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
      {message_pinned && (
        <View style={styles.viewPinMessage}>
          <View style={styles.viewContent}>
            <Text style={styles.txtTitle}>Pinned message</Text>
            <Text style={styles.txtContent} numberOfLines={2}>
              {message_pinned?.message}
            </Text>
          </View>
          <TouchableOpacity style={styles.viewIcon}>
            <Image source={iconDelete} style={styles.iconDelete} />
          </TouchableOpacity>
        </View>
      )}
      <GiftedChat
        placeholder="Type something..."
        messagesContainerStyle={{marginBottom: 20}}
        messages={getConvertedMessages(listChat)}
        onSend={(messages: any) => {
          sendMessage(messages);
        }}
        renderMessage={renderMessage}
        user={chatUser}
        renderSend={renderSend}
      />
    </View>
  );
};

export {DetailChat};
