import {colors} from '@stylesCommon';
import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {defaultAvatar} from '@images';
import {Menu} from 'react-native-material-menu';
import {MenuFeature} from '../components/MenuFeature';

const colorCurrent = ['#CBEEF0', '#BFD6D8'];
const color = ['#E8E8E8', '#D4D4D4'];

const ItemMessage = React.memo((props: any) => {
  const {user, text, _id} = props.currentMessage;
  const [visible, setVisible] = useState(false);

  const onShowMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View style={user?._id === 2 ? styles.containerCurrent : styles.container}>
      <TouchableOpacity style={styles.chat} onPress={onShowMenu}>
        {user?._id === 2 ? (
          <Text style={styles.txtTimeCurent}>13:45</Text>
        ) : (
          <View style={styles.viewAvatar}>
            <FastImage style={styles.image} source={defaultAvatar} />
            <View style={{flex: 1}} />
          </View>
        )}
        <LinearGradient
          colors={user?._id === 2 ? colorCurrent : color}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.containerChat}>
          <Text>{text}</Text>
        </LinearGradient>
        {user?._id === 2 ? null : <Text style={styles.txtTime}>13:45</Text>}
      </TouchableOpacity>
      <Menu
        style={styles.containerMenu}
        visible={visible}
        onRequestClose={onShowMenu}
        key={1}>
        <MenuFeature />
      </Menu>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: scale(11),
  },
  containerCurrent: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: scale(11),
  },
  containerChat: {
    maxWidth: '70%',
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(14),
    borderRadius: moderateScale(16),
    marginTop: verticalScale(15),
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
    marginTop: 5,
  },
});

export {ItemMessage};
