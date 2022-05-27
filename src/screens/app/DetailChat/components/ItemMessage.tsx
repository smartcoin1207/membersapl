import {colors, stylesCommon} from '@stylesCommon';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {defaultAvatar} from '@images';
import {Menu} from 'react-native-material-menu';
import {MenuFeature} from '../components/MenuFeature';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {Reaction} from './Reaction';

const colorCurrent = ['#CBEEF0', '#BFD6D8'];
const color = ['#E8E8E8', '#D4D4D4'];
const width = Dimensions.get('window').width;

const ItemMessage = React.memo((props: any) => {
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const {deleteMsg, pinMsg, replyMsg, editMsg} = props;
  const {
    user,
    text,
    _id,
    reaction,
    createdAt,
    msg_type,
    reply_to_message_text,
  } = props.currentMessage;
  const [visible, setVisible] = useState(false);

  const onShowMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const onActionMenu = useCallback(
    value => {
      onShowMenu();
      switch (value) {
        case 1:
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
        case 2:
          const dataMessageEdit = {
            id: _id,
            user: user,
            text: text,
          };
          editMsg(dataMessageEdit);
          break;
        case 3:
          const dataMessageReply = {
            id: _id,
            user: user,
            text: text,
          };
          replyMsg(dataMessageReply);
          break;
        case 4:
          pinMsg(_id);
          break;
        case 5:
          deleteMsg(_id);
          break;
      }
    },
    [visible],
  );

  return (
    <>
      {msg_type === 11 ||
      msg_type === 4 ||
      msg_type === 5 ||
      msg_type === 9 ||
      msg_type === 10 ||
      msg_type === 12 ? (
        <View style={styles.viewCenter}>
          <Text style={styles.txtCenter} numberOfLines={2}>
            {text}
          </Text>
        </View>
      ) : (
        <View
          style={
            user?._id === user_id ? styles.containerCurrent : styles.container
          }>
          <>
            <TouchableOpacity style={styles.chat} onPress={onShowMenu}>
              {user?._id === user_id ? (
                <Text style={styles.txtTimeCurent}>
                  {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('HH:mm')}
                </Text>
              ) : (
                <View style={styles.viewAvatar}>
                  <FastImage
                    style={styles.image}
                    source={{uri: user?.avatar}}
                  />
                  <View style={{flex: 1}} />
                </View>
              )}
              <LinearGradient
                colors={user?._id === user_id ? colorCurrent : color}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.containerChat}>
                {msg_type === 3 && (
                  <View style={styles.viewReply}>
                    <View style={styles.viewColumn} />
                    <View>
                      <Text style={styles.txtTitleReply}>Reply message</Text>
                      <Text style={styles.txtContentReply} numberOfLines={1}>
                        {reply_to_message_text}
                      </Text>
                    </View>
                  </View>
                )}
                <Text style={styles.txtMessage}>{text}</Text>
              </LinearGradient>
              {user?._id === user_id ? null : (
                <Text style={styles.txtTime}>
                  {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('HH:mm')}
                </Text>
              )}
            </TouchableOpacity>
            {reaction?.length > 0 && (
              <View style={styles.viewReaction}>
                <View style={styles.reaction}>
                  <Reaction reaction={reaction} />
                  {reaction?.length > 1 && (
                    <Text style={styles.txtLengthReaction}>
                      {reaction?.length}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </>
          <Menu
            style={styles.containerMenu}
            visible={visible}
            onRequestClose={onShowMenu}
            key={1}>
            <MenuFeature onActionMenu={(value: any) => onActionMenu(value)} />
          </Menu>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: scale(11),
    marginVertical: verticalScale(6),
  },
  containerCurrent: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: scale(11),
    marginVertical: verticalScale(6),
  },
  viewCenter: {
    width: '100%',
    paddingHorizontal: scale(11),
    alignItems: 'center',
  },
  containerChat: {
    maxWidth: '70%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: verticalScale(16),
  },
  chat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txtTime: {
    marginLeft: scale(7),
    color: colors.border,
    fontSize: moderateScale(10),
  },
  image: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(7),
    borderRadius: scale(26 / 2),
    marginTop: verticalScale(15),
  },
  txtTimeCurent: {
    marginRight: scale(7),
    color: colors.border,
    fontSize: moderateScale(10),
  },
  viewAvatar: {
    // borderWidth: 1,
  },
  containerMenu: {
    marginTop: verticalScale(5),
  },
  viewReaction: {
    marginTop: verticalScale(-10),
    marginLeft: scale(26) + scale(7),
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },
  reaction: {
    flexDirection: 'row',
    paddingHorizontal: scale(5),
    paddingVertical: scale(3),
    borderRadius: moderateScale(16),
    backgroundColor: '#DDDDDD',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLengthReaction: {
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(10),
    marginLeft: scale(2),
  },
  txtMessage: {
    fontSize: moderateScale(16),
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
  },
  txtCenter: {
    fontSize: moderateScale(12),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginVertical: verticalScale(8),
  },
  viewReply: {
    flexDirection: 'row',
    marginBottom: verticalScale(5),
  },
  viewColumn: {
    width: 2,
    height: '100%',
    backgroundColor: 'green',
    marginRight: scale(6),
  },
  txtTitleReply: {
    fontSize: moderateScale(10),
    ...stylesCommon.fontWeight500,
    color: colors.border,
  },
  txtContentReply: {
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight500,
    color: colors.backgroundTab,
    marginTop: verticalScale(8),
  },
});

export {ItemMessage};
