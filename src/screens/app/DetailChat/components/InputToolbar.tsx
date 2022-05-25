import React from 'react';
import {Image, StyleSheet, Platform, View, Text} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import {iconSend} from '@images';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {colors} from '@stylesCommon';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

export const renderSend = (props: any) => (
  <Send
    {...props}
    disabled={!props.text.trim()}
    containerStyle={styles.sendBtn}>
    <Image source={iconSend} style={styles.iconStyle} resizeMode="contain" />
  </Send>
);

export const renderInputToolbar = (props: any) => {
  return (
    <>
      <InputToolbar
        {...props}
        containerStyle={styles.toolBar}
        primaryStyle={{alignItems: 'center'}}
      />
    </>
  );
};

export const renderComposer = (props: any) => (
  <Composer
    {...props}
    textInputStyle={styles.inputMessage}
    placeholder="メッセージ."
    multiline={true}
  />
);

const styles = StyleSheet.create({
  sendBtn: {
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    flex: 1,
  },
  toolBar: {
    backgroundColor: colors.background,
    borderTopWidth: 0,
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 0 : 0) : 6,
  },
  inputMessage: {
    color: '#222B45',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    paddingLeft: scale(10),
    paddingTop: Platform.OS === 'ios' ? verticalScale(12) : undefined,
    marginRight: scale(10),
    minHeight: verticalScale(39),
    paddingRight: scale(43),
    borderWidth: 1,
    borderColor: '#989898',
  },
});
