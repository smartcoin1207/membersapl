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

const MAX_INPUT_HEIGHT = Platform.OS === 'ios' ? 110 : 118;

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
    borderTopWidth: 0,
  },
  toolbarPrimaryStyles: {
    backgroundColor: '#F4F2EF',
    paddingTop: verticalScale(16),
    paddingBottom:
      Platform.OS === 'ios' ? verticalScale(16) : verticalScale(30),
  },
  scrollMessage: {
    backgroundColor: '#fff',
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
    bottom: Platform.OS === 'ios' ? 18 : 15,
    right: 12,
  },
});
