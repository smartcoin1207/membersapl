import React from 'react';
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  InputToolbar,
  Send,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from 'react-native-gifted-chat';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {iconEmoji, iconEmojiActive} from '@images';
import {colors} from '@stylesCommon';

export const renderSend = ({
  showModalStamp,
  ...rest
}: Send['props'] & {showModalStamp: boolean}) => {
  return (
    <Send
      {...rest}
      // disabled={!props.text.trim()}
      containerStyle={styles.sendBtn}>
      <Image
        source={showModalStamp ? iconEmojiActive : iconEmoji}
        style={styles.iconEmojiStyle}
        resizeMode="contain"
      />
    </Send>
  );
};

const MAX_INPUT_HEIGHT = 115;

export const renderInputToolbar = ({
  setIsShowKeyboard,
  isShowKeyboard,
  toolbarRef,
  ...rest
}: Readonly<InputToolbarProps> &
  Readonly<{
    children?: React.ReactNode;
  }> & {
    setIsShowKeyboard: (isShowKeyboard: boolean) => void;
    isShowKeyboard: boolean;
    toolbarRef: any;
  }) => {
  Keyboard.addListener('keyboardWillHide', () => {
    setIsShowKeyboard(false);
  });

  Keyboard.addListener('keyboardDidShow', () => {
    setIsShowKeyboard(true);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setIsShowKeyboard(false);
  });

  return (
    <>
      <InputToolbar
        {...rest}
        ref={toolbarRef}
        containerStyle={[
          styles.toolBar,
          Platform.OS === 'ios' && isShowKeyboard
            ? {
                bottom: toolbarRef?.current?.state?.heightInput,
              }
            : {},
        ]}
      />
    </>
  );
};

export const renderComposer = ({
  setIsFocusInput,
  formattedText,
  onInputTextChanged,
  inputRef,
  ...rest
}: ComposerProps & {
  setIsFocusInput: (isFocus: boolean) => void;
  inputRef: React.LegacyRef<TextInput> | undefined;
} & GiftedChatProps) => {
  if (rest && rest.textInputProps) {
    return (
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollMessage}>
            <TextInput
              {...rest}
              autoFocus
              ref={inputRef}
              placeholder={'メッセージ.'}
              style={styles.inputMessage}
              multiline={true}
              scrollEnabled={false}
              onTextInput={rest.textInputProps.onTextInput}
              onKeyPress={rest.textInputProps.onKeyPress}
              value={undefined}
              onFocus={() => setIsFocusInput(true)}
              onBlur={() => setIsFocusInput(false)}
              // selection={props.textSelection}
              onSelectionChange={rest.textInputProps.onSelectionChange}
              onChangeText={(value: any) => {
                onInputTextChanged?.(value);
              }}>
              {formattedText}
            </TextInput>
          </ScrollView>
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  sendBtn: {
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: scale(50),
    bottom: verticalScale(12),
    height: 18,
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
    paddingTop: scale(16),
    paddingBottom: scale(36),
  },
  scrollMessage: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(21),
    marginRight: scale(10),
    marginLeft: scale(10),
    minHeight: verticalScale(40),
    width: '94%',
    maxHeight: MAX_INPUT_HEIGHT,
  },
  inputMessage: {
    paddingLeft: scale(10),
    paddingRight: scale(43),
    paddingTop: Platform.OS === 'ios' ? verticalScale(12) : undefined,
  },
  iconEmojiStyle: {
    width: 18,
    height: 18,
  },
  composerContainer: {
    flex: 1,
    height: 'auto',
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginLeft: scale(10),
  },
  sendWrapperStyle: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
