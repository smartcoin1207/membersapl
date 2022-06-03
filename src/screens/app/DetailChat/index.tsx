import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import {
  iconSearch,
  iconDetail,
  iconDelete,
  menuReply,
  menuEdit,
  iconClose,
  iconUpload,
  iconLike,
  iconFile,
} from '@images';
import {useFunction} from './useFunction';
import {GiftedChat, Actions} from '../../../lib/react-native-gifted-chat';
import {ItemMessage} from './components/ItemMessage';
import {
  renderSend,
  renderInputToolbar,
  renderComposer,
} from './components/InputToolbar';
import {ModalPickFile} from './components/ModalPickFile';
import FastImage from 'react-native-fast-image';
import {ModalStamp} from './components/ModalStamp';
import {ModalReply} from './components/ModalReply';
import {ModalEdit} from './components/ModalEdit';
import {ModalPin} from './components/ModalPin';

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
    replyMessage,
    messageReply,
    removeReplyMessage,
    editMessage,
    removeEditMessage,
    message_edit,
    reactionMessage,
    navigatiteToListReaction,
    pickFile,
    cancelModal,
    chosePhoto,
    choseFile,
    sendLabel,
    searchMessage,
    showModalStamp,
    modalStamp,
    giftedChatRef,
    text,
    setTextInput,
  } = useFunction(props);

  const renderActions = (props: any) => (
    <Actions
      {...props}
      containerStyle={styles.addBtn}
      onPressActionButton={cancelModal}
      icon={() => <Image source={iconUpload} />}
    />
  );

  const renderActionsRight = (props: any) => (
    <Actions
      {...props}
      containerStyle={styles.buttonRight}
      onPressActionButton={() => sendLabel(1)}
      icon={() => <Image source={iconLike} />}
    />
  );

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
          replyMsg={(data: any) => {
            replyMessage(data);
          }}
          editMsg={(data: any) => {
            editMessage(data);
          }}
          onReaction={(data: any, idMsg: any) => {
            reactionMessage(data, idMsg);
          }}
          navigatiteToListReaction={(idMsg: any) => {
            navigatiteToListReaction(idMsg);
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
    const paddingToTop = Platform.OS === 'ios' ? -20 : 10;
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
        styleIconRightFirst={styles.colorIcon}
        styleIconRightSeccond={styles.colorIcon}
        onRightFirst={navigateToDetail}
        sourceImageCenter={dataDetail?.icon_image}
        onRightSecond={searchMessage}
      />
      {message_pinned?.id && (
        <ModalPin
          updateGimMessage={(id: any, value: any) =>
            updateGimMessage(id, value)
          }
        />
      )}
      <GiftedChat
        text={text}
        ref={giftedChatRef}
        onInputTextChanged={text => setTextInput(text)}
        messages={getConvertedMessages(listChat)}
        onSend={(messages: any) => {
          if (messages[0]?.text?.length === 0) {
            showModalStamp();
          } else {
            sendMessage(messages);
          }
        }}
        alwaysShowSend={true}
        renderMessage={renderMessage}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        user={chatUser}
        renderSend={renderSend}
        renderFooter={() => <View style={styles.viewBottom} />}
        renderActions={renderActions}
        renderActionsRight={renderActionsRight}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({nativeEvent}: any) => {
            if (isCloseToTop(nativeEvent)) {
              onLoadMore();
            }
          },
        }}
        renderAccessory={
          messageReply || message_edit || modalStamp === true
            ? () => (
                <>
                  {messageReply && <ModalReply />}
                  {message_edit && <ModalEdit />}
                  {modalStamp && (
                    <ModalStamp
                      onChose={(value: any) => {
                        sendLabel(value);
                      }}
                    />
                  )}
                </>
              )
            : undefined
        }
        bottomOffset={0}
        messagesContainerStyle={styles.containerMessage}
      />
      <ModalPickFile
        visible={pickFile}
        onCancel={cancelModal}
        chosePhoto={chosePhoto}
        choseFile={choseFile}
      />
    </View>
  );
};

export {DetailChat};
