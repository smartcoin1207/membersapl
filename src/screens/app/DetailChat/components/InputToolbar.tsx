import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {InputToolbar, Send} from 'react-native-gifted-chat';
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

export const renderInputToolbar = (props: any) => {
  return (
    <>
      <InputToolbar {...props} containerStyle={styles.toolBar} />
    </>
  );
};

export const renderComposer = (props: any) => {
  if (props && props.textInputProps) {
    return (
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollMessage}>
            <TextInput
              {...props}
              placeholder={'メッセージ.'}
              style={styles.inputMessage}
              multiline={true}
              scrollEnabled={false}
              onTextInput={props.textInputProps.onTextInput}
              onKeyPress={props.textInputProps.onKeyPress}
              value={null}
              // selection={props.textSelection}
              onSelectionChange={props.textInputProps.onSelectionChange}
              onChangeText={(value: any) => {
                props.onInputTextChanged(value);
              }}>
              {props.formattedText}
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
    minHeight: verticalScale(39),
    width: '94%',
    maxHeight: 117,
  },
  inputMessage: {
    paddingLeft: scale(10),
    paddingTop: Platform.OS === 'ios' ? verticalScale(12) : undefined,
    paddingRight: scale(43),
  },

  iconEmojiStyle: {
    width: 18,
    height: 18,
    alignSelf: 'center',
    flex: 1,
  },
  composerContainer: {
    width: '80%',
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
