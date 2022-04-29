import React, {useCallback} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {debounce} from 'lodash';
import {colors, stylesCommon} from '@stylesCommon';
import {ScaledSheet} from 'react-native-size-matters';

interface buttonType {
  title?: string;
  styleButton?: any;
  styleTitle?: any;
  onPress?: () => void;
}

const AppButton = React.memo((props: buttonType) => {
  const {title, styleButton, styleTitle, onPress} = props;

  const onPressButton = useCallback(
    debounce(() => {
      if (onPress) {
        onPress();
      }
    }, 200),
    [onPress],
  );

  return (
    <TouchableOpacity
      style={[styles.container, styleButton]}
      onPress={onPressButton}>
      <Text style={[styles.titleButton, styleTitle]}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingVertical: '16@vs',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: '8@ms',
  },
  titleButton: {
    fontSize: '16@ms',
    color: '#FFFFFF',
    ...stylesCommon.fontWeight500,
  },
});

export {AppButton};
