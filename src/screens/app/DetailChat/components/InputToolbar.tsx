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
import {colors} from '@stylesCommon';

const MAX_INPUT_HEIGHT = 110;

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
        textInputStyle={styles.scrollMessage}
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
  container: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  },
  toolbarPrimaryStyles: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(30),
  },
  scrollMessage: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(21),
    maxHeight: MAX_INPUT_HEIGHT,
    lineHeight: 17,
    fontSize: 14,
    paddingLeft: 12,
    paddingTop: Platform.OS === 'ios' ? 12 : undefined,
    minHeight: 44,
  },
  iconEmojiStyle: {
    width: 18,
    height: 18,
  },
  composerContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginLeft: scale(10),
    bottom: 0,
    left: 0,
    right: 0,
  },
  showStampButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 18 : 14,
    right: 12,
  },
});
