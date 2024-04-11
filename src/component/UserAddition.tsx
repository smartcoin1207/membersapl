import {colors} from '@stylesCommon';
import React from 'react';
import type {StyleProp, TextProps, TextStyle} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const UserAddition = ({
  customStyle,
  content,
}: {
  customStyle?: StyleProp<TextStyle>;
  content: string;
} & TextProps) => {
  return (
    <Text
      numberOfLines={1}
      style={[styles.txtAddition, customStyle]}
      ellipsizeMode="tail">
      {content}
    </Text>
  );
};

export {UserAddition};

const styles = StyleSheet.create({
  txtAddition: {
    fontSize: moderateScale(9),
    letterSpacing: -0.18,
    color: colors.grey[400],
  },
});
