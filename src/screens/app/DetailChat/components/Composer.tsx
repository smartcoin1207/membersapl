import React, {
  type Ref,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {StyleSheet, TextInput, type NativeSyntheticEvent} from 'react-native';
import type {ComposerProps} from '../../../../lib/react-native-gifted-chat/lib';
import Color from '../../../../lib/react-native-gifted-chat/lib/Color';

export type ComposerRef = {
  onUnFocus: () => void;
};

const Composer = forwardRef<ComposerRef, ComposerProps>(
  (
    {
      placeholderTextColor = Color.defaultColor,
      textInputProps = {},
      onTextChanged,
      onInputSizeChanged,
      disableComposer = false,
      textInputStyle = {},
      textInputAutoFocus = false,
      keyboardAppearance = 'default',
    }: ComposerProps,
    ref: Ref<ComposerRef> | undefined,
  ) => {
    const inputRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      onUnFocus,
    }));

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

    const onUnFocus = () => {
      inputRef.current.blur();
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
        value={undefined}
        {...textInputProps}
        ref={inputRef}
      />
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 'auto',
  },
});

export default Composer;
