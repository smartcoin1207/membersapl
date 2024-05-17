import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Composer,
  InputToolbar,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from 'react-native-gifted-chat';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {iconEmoji, iconEmojiActive} from '@images';
import {TOOLBAR_MIN_HEIGHT, calPositionButton} from '../styles';

const MAX_INPUT_HEIGHT = Platform.OS === 'ios' ? 110 : 118;
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
      />
    </>
  );
};

export const renderComposer = ({
  setIsFocusInput,
  formattedText,
  onInputTextChanged,
  showModalStamp,
  isShowModalStamp,
  textInputProps,
  ...rest
}: ComposerProps & {
  setIsFocusInput: (isFocus: boolean) => void;
  isShowModalStamp: boolean;
  showModalStamp: () => void;
  formattedText: string | Element[];
} & GiftedChatProps) => {
  return (
    <View style={styles.composerContainer}>
      <Composer
        multiline
        {...rest}
        textInputStyle={[
          styles.scrollMessage,
          {
            maxHeight:
              formattedText?.length > 0
                ? MAX_INPUT_HEIGHT
                : styles.scrollMessage.minHeight,
          },
        ]}
        textInputProps={{
          value: undefined,
          onChangeText: onInputTextChanged,
          onFocus: () => setIsFocusInput(true),
          onBlur: () => setIsFocusInput(false),
          children: <>{formattedText}</>,
          placeholder: 'メッセージ.',
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
  toolbarPrimaryStyles: {
    backgroundColor: '#F4F2EF',
    justifyContent: 'flex-end',
    paddingTop: verticalScale(12),
    paddingBottom:
      Platform.OS === 'ios' ? verticalScale(16) : verticalScale(12),
  },
  scrollMessage: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(21),
    maxHeight: MAX_INPUT_HEIGHT,
    lineHeight: 17,
    fontSize: 14,
    paddingLeft: 12,
    paddingTop: Platform.OS === 'ios' ? 12 : undefined,
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
