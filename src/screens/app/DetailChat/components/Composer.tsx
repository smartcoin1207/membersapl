import React, {useState} from 'react';
import {StyleSheet, TextInput, type NativeSyntheticEvent} from 'react-native';
import type {ComposerProps} from '../../../../lib/react-native-gifted-chat/lib';
import Color from '../../../../lib/react-native-gifted-chat/lib/Color';

const Composer = ({
  placeholderTextColor = Color.defaultColor,
  textInputProps = {},
  onTextChanged,
  onInputSizeChanged,
  disableComposer = false,
  textInputStyle = {},
  textInputAutoFocus = false,
  keyboardAppearance = 'default',
}: Omit<ComposerProps, 'text'>) => {
  const [currentContentSize, setCurrentContentSize] = useState<
    {width: number; height: number} | undefined
  >();

  const handleContentSizeChange = (e: NativeSyntheticEvent<any>) => {
    const {contentSize} = e.nativeEvent;

    // Support earlier versions of React Native on Android
    if (!contentSize) {
      return;
    }

    if (
      !currentContentSize ||
      (currentContentSize &&
        (currentContentSize.width !== contentSize.width ||
          currentContentSize.height !== contentSize.height))
    ) {
      setCurrentContentSize(contentSize);
      onInputSizeChanged?.(contentSize);
    }
  };

  const handleChangeText = (textChange: string) => {
    onTextChanged?.(textChange);
  };

  return (
    <TextInput
      accessible
      accessibilityLabel="メッセージ"
      placeholder="メッセージ"
      placeholderTextColor={placeholderTextColor}
      multiline
      editable={!disableComposer}
      onChange={handleContentSizeChange}
      onContentSizeChange={handleContentSizeChange}
      onChangeText={handleChangeText}
      style={[styles.textInput, textInputStyle]}
      autoFocus={textInputAutoFocus}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance={keyboardAppearance}
      textAlignVertical="center"
      {...textInputProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 'auto',
  },
});

export default Composer;
