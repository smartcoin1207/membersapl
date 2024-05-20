import React, {useCallback, useRef} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import {Header} from '@component';
import {
  iconAttach,
  iconDetail,
  iconSearch,
  iconSend,
  iconSendActive,
} from '@images';

import {Actions, GiftedChat} from '../../../lib/react-native-gifted-chat';
import DecoButton from './components/DecoButton';
import {renderComposer, renderInputToolbar} from './components/InputToolbar';
import {ItemMessage} from './components/ItemMessage';
import {ModalEdit} from './components/ModalEdit';
import {ModalPickFile} from './components/ModalPickFile';
import {ModalPin} from './components/ModalPin';
import {ModalQuote} from './components/ModalQuote';
import {ModalReply} from './components/ModalReply';
import {ModalStamp} from './components/ModalStamp';
import {ModalTagName} from './components/ModalTagName';
import {ShowPickedFile} from './components/ShowPickedFile';
import {styles} from './styles';
import {useFunction} from './useFunction';

const DetailChat = (props: any) => {
  // custom hook logic
  const {
    idRoomChat,
    chatUser,
    getConvertedMessages,
    listChat,
    deleteMsg,
    dataDetail,
    sendMessage,
    navigateToDetail,
    message_pinned,
    updateGimMessage,
    onLoadMore,
    onLoadMoreDown,
    replyMessage,
    messageReply,
    editMessage,
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
    setShowTag,
    showTagModal,
    listUserChat,
    bookmarkMessage,
    ids,
    setIds,
    setIndex,
    newIndexArray,
    quoteMessage,
    messageQuote,
    formattedText,
    setFormattedText,
    mentionedUsers,
    formatText,
    getText,
    me,
    showRedLine,
    idRedLine,
    navigateToMessage,
    indexRedLine,
    partCopy,
    changePartCopy,
    setInputText,
    inputText,
    textSelection,
    onDecoSelected,
    chosenFiles,
    deleteFile,
    setListUserSelect,
    listUserSelect,
    customBack,
    setInputIndex,
    inputIndex,
    isSendingMessage,
    setPageLoading,
    isFocusInput,
    setIsFocusInput,
    accessoryHeight,
    setAccessoryHeight,
  } = useFunction(props);

  const mute = useSelector((state: any) => state.chat.isMuteStatusRoom);

  const isShowAccessory =
    messageReply ||
    message_edit ||
    messageQuote ||
    modalStamp === true ||
    showTagModal === true;

  //Render ra UI chọn ảnh, vid`eo, file
  const renderActions = useCallback(
    (inputProps: any) => {
      return (
        <Actions
          {...inputProps}
          containerStyle={styles.attachIcon}
          onPressActionButton={cancelModal}
          icon={() => <Image source={iconAttach} />}
        />
      );
    },
    [cancelModal],
  );

  const renderSend = useCallback(
    (inputProps: any) => {
      const isActiveSend = inputText.length > 0 || chosenFiles.length > 0;

      const isActiveSendButton = isActiveSend && !isSendingMessage;

      return (
        <>
          <View pointerEvents={!isActiveSendButton ? 'none' : 'auto'}>
            {
              <Actions
                {...inputProps}
                containerStyle={styles.buttonRight}
                onPressActionButton={() => {
                  const messages = [
                    {
                      text: getText(formattedText),
                      user: {_id: inputProps.user?._id},
                      createdAt: new Date(Date.now()),
                    },
                  ];
                  sendMessage(messages);
                  setFormattedText([]);
                }}
                icon={() => {
                  return isActiveSendButton ? (
                    <View style={[styles.activeSendButton, styles.sendButton]}>
                      <Image source={iconSendActive} />
                    </View>
                  ) : (
                    <View style={styles.sendButton}>
                      <Image source={iconSend} />
                    </View>
                  );
                }}
              />
            }
          </View>
        </>
      );
    },
    [
      getText,
      sendMessage,
      setFormattedText,
      isSendingMessage,
      chosenFiles.length,
      inputText.length,
      formattedText,
    ],
  );

  //Render ra UI của message
  const renderMessage = useCallback(
    (inputProps: any) => {
      return (
        <>
          <ItemMessage
            {...inputProps}
            idRoomChat={idRoomChat}
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
            bookmarkMsg={(data: any) => {
              bookmarkMessage(data);
            }}
            onReaction={(data: any, idMsg: any) => {
              reactionMessage(data, idMsg);
            }}
            changePartCopy={(data: any) => {
              changePartCopy(data);
            }}
            quoteMsg={(data: any) => {
              quoteMessage(data);
            }}
            navigatiteToListReaction={(idMsg: any) => {
              navigatiteToListReaction(idMsg);
            }}
            listUser={listUserChat}
            newIndexArray={newIndexArray}
            me={me}
            showRedLine={showRedLine}
            idRedLine={idRedLine}
            isAdmin={dataDetail?.is_admin}
            moveToMessage={(id: any) => {
              navigateToMessage(id);
            }}
            indexRedLine={indexRedLine}
            setFormattedText={setFormattedText}
            mentionedUsers={mentionedUsers}
            setListUserSelect={setListUserSelect}
            setInputText={setInputText}
            setPageLoading={setPageLoading}
          />
        </>
      );
    },
    [
      listUserChat,
      newIndexArray,
      bookmarkMessage,
      dataDetail?.is_admin,
      deleteMsg,
      editMessage,
      idRoomChat,
      indexRedLine,
      me,
      mentionedUsers,
      navigateToMessage,
      navigatiteToListReaction,
      quoteMessage,
      reactionMessage,
      changePartCopy,
      idRedLine,
      replyMessage,
      setFormattedText,
      showRedLine,
      updateGimMessage,
      setInputText,
      setListUserSelect,
      setPageLoading,
    ],
  );

  //Check phạm vi để gọi hàm loadmore
  const isCloseToTop = useCallback(
    ({layoutMeasurement, contentOffset, contentSize}: any) => {
      const paddingToTop = Platform.OS === 'ios' ? -20 : 10;
      return (
        contentSize.height - layoutMeasurement.height - paddingToTop <=
        contentOffset.y
      );
    },
    [],
  );

  //Check vị trí scroll màn hình đang ở index số mấy
  const onViewRef = useRef((viewableItems: any) => {
    const index = viewableItems?.viewableItems?.length - 1;
    setIndex(viewableItems?.viewableItems[index]?.index);
  });

  //Config view xem trong tài liệu của RN
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 0,
  });

  return (
    <View style={styles.container}>
      <View style={{height: '100%'}}>
        <Header
          back
          //Check title header nếu đây là chat 1-1 hay chat nhóm
          title={
            dataDetail?.name && dataDetail?.name?.length > 0
              ? dataDetail?.name
              : `${
                  dataDetail?.one_one_check &&
                  dataDetail?.one_one_check?.length > 0
                    ? dataDetail?.one_one_check[0]?.last_name
                    : ''
                } ${
                  dataDetail?.one_one_check &&
                  dataDetail?.one_one_check?.length > 0
                    ? dataDetail?.one_one_check[0]?.first_name
                    : ''
                }`
          }
          imageCenter
          iconRightFirst={iconDetail}
          iconRightSecond={iconSearch}
          styleIconRightFirst={[styles.colorIcon, styles.size]}
          styleIconRightSeccond={styles.colorIcon}
          onRightFirst={navigateToDetail}
          sourceImageCenter={
            dataDetail?.one_one_check?.length > 0
              ? dataDetail?.one_one_check[0]?.icon_image
              : dataDetail?.icon_image
          }
          onRightSecond={searchMessage}
          customBack={customBack}
          mute={mute}
        />
        {/* UI pin message */}
        {message_pinned?.id && (
          <ModalPin
            updateGimMessage={(id: any, value: any) =>
              updateGimMessage(id, value)
            }
          />
        )}

        {/* UI list chat message */}
        <GiftedChat
          keyboardShouldPersistTaps={'handled'}
          ref={giftedChatRef}
          onInputTextChanged={txt => {
            formatText(txt, false);
            setInputText(txt);
          }}
          messages={getConvertedMessages(listChat)}
          onSend={sendMessage}
          alwaysShowSend={true}
          renderMessage={renderMessage}
          renderInputToolbar={renderInputToolbar}
          renderComposer={composerProps =>
            renderComposer({
              setIsFocusInput,
              formattedText,
              showModalStamp,
              isShowModalStamp: modalStamp,
              onInputTextChanged: txt => {
                formatText(txt, false);
                setInputText(txt);
              },
              ...composerProps,
            })
          }
          wrapInSafeArea={false}
          user={chatUser}
          renderSend={renderSend}
          renderActions={renderActions}
          maxComposerHeight={118}
          //Các props của flatlist nhúng vào gifted chat
          listViewProps={{
            scrollEventThrottle: 400,
            //Xử lý loadmore tin nhắn
            onScroll: ({nativeEvent}: any) => {
              if (isCloseToTop(nativeEvent)) {
                onLoadMore();
              } else if (nativeEvent?.contentOffset?.y === 0) {
                onLoadMoreDown();
              }
            },

            //Xử lý tracking xem đang scroll ở vị trí tin nhắn số bao nhiêu
            viewabilityConfig: viewConfigRef.current,
            onViewableItemsChanged: onViewRef.current,

            //Xử lý khi vào màn detail chat sẽ nhảy đến message được chỉ định
            onScrollToIndexFailed: (info: any) => {
              if (info?.index >= 0) {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex(
                    {
                      animated: true,
                      index: info?.index,
                    },
                  );
                });
              }
            },
          }}
          //Các props của textInput nhúng vào gifted chat
          textInputProps={{
            onTextInput: ({nativeEvent}: any) => {
              nativeEvent.text === '@' ? setShowTag(true) : setShowTag(false);
            },
            onSelectionChange: ({nativeEvent}: any) => {
              textSelection.start = nativeEvent.selection.start;
              textSelection.end = nativeEvent.selection.end;
              setInputIndex(nativeEvent.selection.start);
            },
          }}
          renderFooter={() => <View style={{height: accessoryHeight + 70}} />}
          //Chú ý đây là phần xử lý các UI nằm bên trên của input chat (có custom trong thư viện)
          renderAccessory={() => {
            return (
              <View
                onLayout={event =>
                  setAccessoryHeight(event.nativeEvent.layout.height)
                }>
                {isShowAccessory ? (
                  <>
                    {/* UI modal tag name */}
                    {showTagModal && (
                      <ModalTagName
                        idRoomChat={idRoomChat}
                        choseUser={(value: any, title: string, id: any) => {
                          setShowTag(false);
                          let mentionUserIds = [];
                          if (id === 'All') {
                            // メンション先のユーザ情報（ルームメンバー全員）
                            const allMentionUsers = listUserChat.map(
                              (el: any) => {
                                return {
                                  userId: el.id,
                                  userName: el.last_name + el.first_name,
                                };
                              },
                            );
                            // メンション先のユーザID（ルームメンバー全員）
                            mentionUserIds = allMentionUsers.map(
                              (user: {[x: string]: any}) => user.userId,
                            );
                            setListUserSelect(allMentionUsers);
                          } else {
                            // メンション先のユーザID（指定ユーザ）
                            mentionUserIds = [id];
                            // メンション先のユーザ情報（指定ユーザ）
                            listUserSelect.push({
                              userId: id,
                              userName: value,
                            });
                            setListUserSelect(listUserSelect);
                          }
                          // メンション通知を送る対象のユーザID
                          setIds(ids?.concat(mentionUserIds));

                          if (value) {
                            // 敬称名
                            const honorificTitle = value + title;
                            // メンション先に追加
                            mentionedUsers.push('@' + honorificTitle);
                            mentionedUsers.push('@' + value);
                            // @の入力位置の前までの文字列を切り出す
                            const before = inputText.slice(0, inputIndex - 1);
                            // @の入力位置より後の文字を切り出す
                            const after = inputText.slice(
                              inputIndex,
                              inputText.length,
                            );
                            // 切り出した前後の文字列を@敬称名に結合することで入力した@をメンション先氏名に置換する
                            const replacedText = `${before} @${honorificTitle} ${after}`;
                            formatText(replacedText, true);
                            setInputText(replacedText);
                          }
                        }}
                      />
                    )}
                    {/* UI reply message */}
                    {messageReply && <ModalReply />}
                    {/* UI Edit message */}
                    {message_edit && <ModalEdit />}
                    {/* UI message quote */}
                    {messageQuote && <ModalQuote />}
                    {/* UI chọn stamp */}
                    {modalStamp && (
                      <ModalStamp
                        onChose={(value: any) => {
                          sendLabel(value);
                        }}
                      />
                    )}
                  </>
                ) : isFocusInput ? (
                  <DecoButton onDecoSelected={onDecoSelected} />
                ) : undefined}
              </View>
            );
          }}
          bottomOffset={0}
          messagesContainerStyle={styles.containerMessage}
        />
        {chosenFiles.length > 0 && (
          <ShowPickedFile chosenFiles={chosenFiles} deleteFile={deleteFile} />
        )}
      </View>

      {/* UI modal chọn ảnh, video và file */}
      <ModalPickFile
        visible={pickFile}
        onCancel={cancelModal}
        chosePhoto={chosePhoto}
        choseFile={choseFile}
      />
      {partCopy && (
        <View style={styles.viewPartCopy}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.viewPartCopyOverlay,
              {alignItems: partCopy.me ? 'flex-end' : 'flex-start'},
            ]}
            onPress={() => changePartCopy(null)}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <LinearGradient
                colors={partCopy.colors}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.containerChat}>
                <TextInput
                  editable={Platform.OS === 'android'}
                  multiline
                  scrollEnabled={true}
                  selectTextOnFocus={true}
                  showSoftInputOnFocus={false}
                  style={styles.partCopyText}
                  value={partCopy.text}
                  onChangeText={() => {
                    Keyboard.dismiss();
                    changePartCopy(partCopy);
                  }}
                />
              </LinearGradient>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export {DetailChat};
