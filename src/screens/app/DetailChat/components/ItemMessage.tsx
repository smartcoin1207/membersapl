import {colors, stylesCommon} from '@stylesCommon';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {defaultAvatar} from '@images';
import {Menu} from 'react-native-material-menu';
import {MenuFeature} from '../components/MenuFeature';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {Reaction} from './Reaction';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {styles} from './stylesItem';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {MsgFile} from './MsgFile';

const colorCurrent = ['#CBEEF0', '#BFD6D8'];
const color = ['#E8E8E8', '#D4D4D4'];
const width = Dimensions.get('window').width;

const ItemMessage = React.memo((props: any) => {
  const navigation = useNavigation<any>();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const {
    deleteMsg,
    pinMsg,
    replyMsg,
    editMsg,
    onReaction,
    navigatiteToListReaction,
  } = props;
  const {
    user,
    text,
    _id,
    reaction,
    createdAt,
    msg_type,
    reply_to_message_text,
    attachment_files,
    reply_to_message_files,
    stamp_icon,
  } = props.currentMessage;

  const [visible, setVisible] = useState(false);

  const onShowMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const navigateToList = useCallback(_id => {
    navigatiteToListReaction(_id);
  }, []);

  const onActionMenu = useCallback(
    value => {
      onShowMenu();
      switch (value) {
        case 7:
          Clipboard.setString(text);
          showMessage({
            message: 'コピー',
            backgroundColor: colors.backgroundTab,
            color: '#FFFFFF',
            position: {
              bottom: 0,
              left: width / 2 - scale(50 + 10),
              right: width / 2 - scale(50),
            },
            duration: 500,
            style: {
              width: scale(100),
              justifyContent: 'center',
              alignItems: 'center',
            },
          });
          break;
        case 8:
          const dataMessageEdit = {
            id: _id,
            user: user,
            text: text,
            attachment_files: attachment_files,
          };
          editMsg(dataMessageEdit);
          break;
        case 9:
          const dataMessageReply = {
            id: _id,
            user: user,
            text: text,
            attachment_files: attachment_files,
          };
          replyMsg(dataMessageReply);
          break;
        case 10:
          pinMsg(_id);
          break;
        case 11:
          deleteMsg(_id);
          break;
      }
    },
    [visible],
  );

  const onActionReaction = useCallback(
    value => {
      onShowMenu();
      onReaction(value, _id);
    },
    [visible],
  );

  var countReaction = reaction.reduce(function (total: any, course: any) {
    return total + course.count;
  }, 0);

  return (
    <>
      {msg_type == 11 ||
      msg_type == 4 ||
      msg_type == 5 ||
      msg_type == 9 ||
      msg_type == 10 ||
      msg_type == 12 ? (
        <View style={styles.viewCenter}>
          <Text style={styles.txtCenter} numberOfLines={2}>
            {text}
          </Text>
        </View>
      ) : (
        <View
          style={
            user?._id == user_id ? styles.containerCurrent : styles.container
          }>
          <>
            <TouchableOpacity
              style={styles.chat}
              onPress={onShowMenu}
              disabled={msg_type == 1}>
              {user?._id == user_id ? (
                <Text style={styles.txtTimeCurent}>
                  {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('HH:mm')}
                </Text>
              ) : (
                <View style={styles.viewAvatar}>
                  <Image style={styles.image} source={{uri: user?.avatar}} />
                  <View style={{flex: 1}} />
                </View>
              )}
              <>
                {msg_type == 1 ? (
                  <Image source={{uri: stamp_icon}} style={styles.imageStamp} />
                ) : (
                  <LinearGradient
                    colors={user?._id == user_id ? colorCurrent : color}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={styles.containerChat}>
                    {reply_to_message_text ||
                    reply_to_message_files?.length > 0 ? (
                      <View style={styles.viewReply}>
                        <View style={styles.viewColumn} />
                        <View>
                          <Text style={styles.txtTitleReply}>
                            Reply message
                          </Text>
                          {reply_to_message_text && (
                            <Text
                              style={styles.txtContentReply}
                              numberOfLines={1}>
                              {reply_to_message_text}
                            </Text>
                          )}
                          {reply_to_message_files?.length > 0 && (
                            <View style={styles.viewRowEdit}>
                              {reply_to_message_files?.map((item: any) => (
                                <Image
                                  source={{uri: item?.path}}
                                  style={styles.imageSmall}
                                  key={item?.id}
                                />
                              ))}
                            </View>
                          )}
                        </View>
                      </View>
                    ) : null}
                    {msg_type == 2 ? (
                      <MsgFile data={attachment_files} />
                    ) : (
                      <Text style={styles.txtMessage}>{text}</Text>
                    )}
                  </LinearGradient>
                )}
              </>
              {user?._id == user_id ? null : (
                <Text style={styles.txtTime}>
                  {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('HH:mm')}
                </Text>
              )}
            </TouchableOpacity>
            {reaction?.length > 0 && (
              <TouchableOpacity
                style={styles.viewReaction}
                onPress={() => navigateToList(_id)}>
                <View style={styles.reaction}>
                  <Reaction reaction={reaction} />
                  {countReaction > 1 && (
                    <Text style={styles.txtLengthReaction}>
                      {countReaction}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </>
          <Menu
            style={styles.containerMenu}
            visible={visible}
            onRequestClose={onShowMenu}
            key={1}>
            <MenuFeature
              onActionMenu={(value: any) => onActionMenu(value)}
              onActionReaction={(value: any) => onActionReaction(value)}
            />
          </Menu>
        </View>
      )}
    </>
  );
});

export {ItemMessage};
