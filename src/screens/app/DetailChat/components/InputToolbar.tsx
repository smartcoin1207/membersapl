import React, {type RefObject} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {moderateScale, scale} from 'react-native-size-matters';

import {iconEmoji, iconEmojiActive} from '@images';

import {
  InputToolbar,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from '../../../../lib/react-native-gifted-chat';
import Composer from './Composer';
import {TOOLBAR_MIN_HEIGHT, calPositionButton} from '../styles';

const MAX_INPUT_HEIGHT = 132;
const EMOJI_ICON_WIDTH = 18;

const getToolbarStyles = (isShowKeyboard: boolean) =>
  StyleSheet.create({
    toolBar: {
      borderTopWidth: 0,
      bottom: isShowKeyboard ? 21 + getBottomSpace() : 0,
    },
    toolbarPrimaryStyles: {
      backgroundColor: '#F4F2EF',
      justifyContent: 'flex-end',
      paddingTop: 12,
      paddingBottom: getBottomSpace() > 33 ? 33 : 33 - getBottomSpace(),
    },
    scrollMessage: {
      maxHeight: MAX_INPUT_HEIGHT,
      lineHeight: 22,
      fontSize: 14,
      paddingLeft: 12,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 30,
      marginTop: 0,
      marginBottom: 0,
    },
  });

export const renderInputToolbar = ({
  ref,
  ...inputProps
}: Readonly<InputToolbarProps> &
  Readonly<{
    children?: React.ReactNode;
    ref: RefObject<InputToolbar> | null;
  }>) => {
  const isShowKeyboard = ref?.current?.state?.position === 'relative';

  const toolbarStyles = getToolbarStyles(isShowKeyboard);

  return (
    <>
      <InputToolbar
        {...inputProps}
        ref={ref}
        containerStyle={toolbarStyles.toolBar}
        primaryStyle={toolbarStyles.toolbarPrimaryStyles}
        accessoryStyle={styles.accessoryStyle}
      />
    </>
  );
};

const getComposerStyles = (minHeight: number) => {
  const DEFAULT_PADDING = (TOOLBAR_MIN_HEIGHT - minHeight) / 2;

  return StyleSheet.create({
    composerContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFF',
      paddingTop: Platform.OS === 'ios' ? DEFAULT_PADDING - 4 : DEFAULT_PADDING,
      paddingBottom:
        Platform.OS === 'ios' ? DEFAULT_PADDING + 4 : DEFAULT_PADDING,
      borderRadius: moderateScale(21),
      position: 'relative',
      marginLeft: 13,
    },
  });
};

export const renderComposer = ({
  toggleDecoButtons,
  formattedText,
  onInputTextChanged,
  showModalStamp,
  isShowModalStamp,
  textInputProps,
  composerHeight,
  setDefaultMinHeightInput,
  minHeightInput,
  ...rest
}: ComposerProps & {
  toggleDecoButtons: () => void;
  isShowModalStamp: boolean;
  showModalStamp: () => void;
  formattedText: (string | JSX.Element)[];
  setDefaultMinHeightInput: (height: number) => void;
  minHeightInput: number;
} & GiftedChatProps) => {
  const composerStyles = getComposerStyles(minHeightInput);
  return (
    <View
      style={composerStyles.composerContainer}
      onLayout={e => console.log({a: e.nativeEvent.layout.height})}>
      <Composer
        {...rest}
        textInputStyle={[
          styles.scrollMessage,
          {borderRadius: (composerHeight ?? 0) > 44 ? scale(12) : scale(21)},
        ]}
        multiline
        composerHeight={composerHeight}
        textInputProps={{
          value: undefined,
          textAlignVertical: 'center',
          onLayout: e => setDefaultMinHeightInput(e.nativeEvent.layout.height),
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
  accessoryStyle: {
    height: 'auto',
  },
  scrollMessage: {
    maxHeight: MAX_INPUT_HEIGHT,
    lineHeight: 22,
    fontSize: 14,
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 30,
    marginTop: 0,
    marginBottom: 0,
  },
  iconEmojiStyle: {
    width: EMOJI_ICON_WIDTH,
    height: EMOJI_ICON_WIDTH,
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
