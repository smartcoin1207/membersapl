import {IS_IOS} from '@constants/dimensions';
import {iconEmoji} from '@images';
import {colors} from '@stylesCommon';
import React from 'react';
import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {InputToolbar, Send} from 'react-native-gifted-chat';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      // disabled={!props.text.trim()}
      containerStyle={styles.sendBtn}>
      <Image
        source={iconEmoji}
        style={styles.iconEmojiStyle}
        resizeMode="contain"
      />
    </Send>
  );
};

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
    right: 50,
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
    marginBottom: IS_IOS ? (isIphoneX() ? 0 : 0) : 6,
    paddingTop: 8,
  },
  scrollMessage: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    marginRight: scale(10),
    marginLeft: scale(10),
    minHeight: verticalScale(39),
    borderWidth: 1,
    borderColor: '#989898',
    width: '94%',
  },
  inputMessage: {
    paddingLeft: scale(10),
    paddingTop: IS_IOS ? verticalScale(12) : undefined,
    paddingRight: scale(43),
  },

  iconEmojiStyle: {
    width: 29,
    height: 29,
    alignSelf: 'center',
    flex: 1,
  },

  sendIconStyle: {
    height: 30,
    width: 30,
  },
  composerContainer: {
    width: '80%',
    height: 55,
    flexDirection: 'row',
    paddingTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginLeft: scale(10),
  },
  textInput: {
    fontSize: 14,
    letterSpacing: 1,
    height: 50,
    minWidth: 250,
    maxWidth: 250,
    borderWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
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
