import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Composer,
  InputToolbar,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from 'react-native-gifted-chat';
import {moderateScale, scale} from 'react-native-size-matters';

import {iconEmoji, iconEmojiActive} from '@images';
import {IS_IOS} from '@util';

import {TOOLBAR_MIN_HEIGHT, calPositionButton} from '../styles';

const MAX_INPUT_HEIGHT = IS_IOS ? 110 : 118;
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
  formattedText: string | Element[];
  inputText: string;
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
          placeholder: 'メッセージ',
          ...textInputProps,
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
    backgroundColor: '#FFF',
    borderRadius: moderateScale(21),
    maxHeight: MAX_INPUT_HEIGHT,
    lineHeight: 17,
    fontSize: 14,
    paddingLeft: 12,
    paddingTop: IS_IOS ? 12 : undefined,
    paddingRight: 30,
    minHeight: TOOLBAR_MIN_HEIGHT,
  },
  iconEmojiStyle: {
    width: EMOJI_ICON_WIDTH,
    height: EMOJI_ICON_WIDTH,
  },
  composerContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: scale(10),
    bottom: 0,
    left: 0,
    right: 0,
  },
  showStampButton: {
    position: 'absolute',
    bottom: calPositionButton(EMOJI_ICON_WIDTH),
    right: 12,
  },
});
