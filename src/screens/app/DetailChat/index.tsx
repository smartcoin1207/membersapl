import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import {iconSearch, iconDetail, iconDelete} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useFunction} from './useFunction';
import {Menu} from 'react-native-material-menu';
import {
  GiftedChat,
  Message,
  LoadEarlier,
} from '../../../lib/react-native-gifted-chat';
import {ItemMessage} from './components/ItemMessage';
import {renderSend} from './components/InputToolbar';
import {colors} from '@stylesCommon';

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
    updateGimMessage,
    onLoadMore,
  } = useFunction(props);

  const renderMessage = (props: any) => {
    return (
      <>
        <ItemMessage
          {...props}
          deleteMsg={(id: any) => {
            deleteMsg(id);
          }}
          pinMsg={(id: any) => {
            updateGimMessage(id, 1);
          }}
        />
      </>
    );
  };

  const isCloseToTop = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToTop = -20;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
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
      {message_pinned?.message && (
        <View style={styles.viewPinMessage}>
          <View style={styles.viewContent}>
            <Text style={styles.txtTitle}>Pinned message</Text>
            <Text style={styles.txtContent} numberOfLines={2}>
              {message_pinned?.message}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewIcon}
            onPress={() => {
              updateGimMessage(message_pinned?.id, 0);
            }}>
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
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({nativeEvent}: any) => {
            if (isCloseToTop(nativeEvent)) {
              onLoadMore();
            }
          },
        }}
      />
    </View>
  );
};

export {DetailChat};
