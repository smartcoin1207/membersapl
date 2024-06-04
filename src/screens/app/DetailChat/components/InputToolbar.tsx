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
import {IS_IOS} from '@util';

import {
  InputToolbar,
  type ComposerProps,
  type GiftedChatProps,
  type InputToolbarProps,
} from '../../../../lib/react-native-gifted-chat';
import {TOOLBAR_MIN_HEIGHT, calPositionButton} from '../styles';
import Composer from './Composer';

const MAX_INPUT_HEIGHT = 146;
const EMOJI_ICON_WIDTH = 18;

const getToolbarStyles = (isShowKeyboard: boolean) =>
  StyleSheet.create({
    toolBar: {
      borderTopWidth: 0,
      bottom: isShowKeyboard ? getBottomSpace() + (IS_IOS ? 6 : 1) : 0,
    },
    toolbarPrimaryStyles: {
      backgroundColor: '#F4F2EF',
      justifyContent: 'flex-end',
      paddingTop: 16,
      paddingBottom: isShowKeyboard ? 16 : 28,
    },
  });

export const renderInputToolbar = ({
  ref,
  isShowKeyboard,
  ...inputProps
}: Readonly<InputToolbarProps> &
  Readonly<{
    children?: React.ReactNode;
    isShowKeyboard: boolean;
    ref: RefObject<InputToolbar> | null;
  }>) => {
  const toolbarStyles = getToolbarStyles(isShowKeyboard);

  return (
    <InputToolbar
      {...inputProps}
      ref={ref}
      containerStyle={toolbarStyles.toolBar}
      primaryStyle={toolbarStyles.toolbarPrimaryStyles}
      accessoryStyle={styles.accessoryStyle}
    />
  );
};

const getComposerStyles = (
  minHeight: number,
  composerHeight: number,
  formattedText: (string | JSX.Element)[],
) => {
  const defaultPadding = (TOOLBAR_MIN_HEIGHT - minHeight) / 2;

  return StyleSheet.create({
    composerContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'ios' ? defaultPadding - 4 : defaultPadding,
      paddingBottom:
        Platform.OS === 'ios' ? defaultPadding + 4 : defaultPadding,
      borderRadius: moderateScale(21),
      position: 'relative',
      marginLeft: 13,
      ...(formattedText?.length < 1 ? {maxHeight: TOOLBAR_MIN_HEIGHT} : {}),
    },
    scrollMessage: {
      maxHeight: MAX_INPUT_HEIGHT,
      lineHeight: 22,
      fontSize: 14,
      paddingLeft: 13,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 30,
      marginTop: 0,
      marginBottom: 0,
      minHeight: 22,
      borderRadius: composerHeight > TOOLBAR_MIN_HEIGHT ? scale(12) : scale(21),
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
  const composerStyles = getComposerStyles(
    minHeightInput,
    composerHeight ?? 0,
    formattedText,
  );
  return (
    <View style={composerStyles.composerContainer}>
      <Composer
        {...rest}
        textInputStyle={composerStyles.scrollMessage}
        textInputProps={{
          value: undefined,
          onLayout: e => setDefaultMinHeightInput(e.nativeEvent.layout.height),
          onChangeText: onInputTextChanged,
          onFocus: toggleDecoButtons,
          onBlur: toggleDecoButtons,
          children: <>{formattedText}</>,
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
