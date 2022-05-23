import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import {iconSend} from '@images';

export const renderSend = (props: any) => (
  <Send
    {...props}
    disabled={!props.text.trim()}
    containerStyle={styles.sendBtn}>
    <Image source={iconSend} style={styles.iconStyle} resizeMode="contain" />
  </Send>
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
});
