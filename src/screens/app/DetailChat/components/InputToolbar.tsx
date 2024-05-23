import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  InputToolbar,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from 'react-native-gifted-chat';
import {moderateScale, scale} from 'react-native-size-matters';

import {iconEmoji, iconEmojiActive} from '@images';
import {IS_IOS} from '@util';
import Composer from './Composer';

const MAX_INPUT_HEIGHT = 114;
const EMOJI_ICON_WIDTH = 18;

export const renderInputToolbar = (
  inputProps: Readonly<InputToolbarProps> &
    Readonly<{
      children?: React.ReactNode;
    }>,
) => {
  return (
    <>
      <InputToolbar
        {...inputProps}
        containerStyle={styles.toolBar}
        primaryStyle={styles.toolbarPrimaryStyles}
        accessoryStyle={styles.accessoryStyle}
      />
    </>
  );
};

export const renderComposer = ({
  toggleDecoButtons,
  formattedText,
  onInputTextChanged,
  showModalStamp,
  isShowModalStamp,
  textInputProps,
  ...rest
}: ComposerProps & {
  toggleDecoButtons: () => void;
  isShowModalStamp: boolean;
  showModalStamp: () => void;
  formattedText: (string | JSX.Element)[];
} & GiftedChatProps) => {
  return (
    <View style={styles.composerContainer}>
      <Composer
        multiline
        {...rest}
        textInputStyle={[
          styles.scrollMessage,
          !formattedText.length
            ? {maxHeight: styles.scrollMessage.minHeight}
            : {},
        ]}
        textInputProps={{
          value: undefined,
          onChangeText: onInputTextChanged,
          onFocus: toggleDecoButtons,
          onBlur: toggleDecoButtons,
          children: <>{formattedText}</>,
          onLayout: e => console.log(e.nativeEvent.layout.height),
          placeholder: 'メッセージ',
          ...textInputProps,
          textAlignVertical: 'center',
        }}
      />
      <TouchableOpacity onPress={showModalStamp} style={styles.showStampButton}>
        <Image
          source={isShowModalStamp ? iconEmojiActive : iconEmoji}
          style={styles.iconEmojiStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    flex: 1,
  },
  toolBar: {
    borderTopWidth: 0,
  },
  accessoryStyle: {
    height: 'auto',
  },
  toolbarPrimaryStyles: {
    backgroundColor: '#F4F2EF',
    justifyContent: 'flex-end',
    paddingTop: 12,
    paddingBottom: IS_IOS ? 31 : 33,
  },
  scrollMessage: {
    maxHeight: MAX_INPUT_HEIGHT,
    fontSize: 14,
    paddingTop: 0,
    paddingRight: 18,
    flex: 1,
    minHeight: 17,
  },
  iconEmojiStyle: {
    width: EMOJI_ICON_WIDTH,
    height: EMOJI_ICON_WIDTH,
  },
  composerContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    marginLeft: 15,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    borderRadius: moderateScale(21),
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: scale(10),
    bottom: 0,
    left: 0,
    right: 0,
  },
  showStampButton: {
    right: 12,
  },
});
