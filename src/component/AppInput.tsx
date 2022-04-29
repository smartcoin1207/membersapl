import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {ScaledSheet} from 'react-native-size-matters';

interface inputType {
  value?: string;
  onChange?: any;
  placeholder?: string;
  styleContainer?: any;
  styleInput?: any;
  error?: string;
}

const AppInput = React.memo((props: inputType) => {
  const {value, onChange, placeholder, styleContainer, styleInput, error} =
    props;

  return (
    <View style={styles.view}>
      <View style={[styles.container, styleContainer]}>
        <TextInput
          style={[styles.input, styleInput]}
          onChangeText={onChange ? onChange : () => {}}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
        />
      </View>
      {error ? <Text style={styles.txtTxtError}>{error}</Text> : <></>}
    </View>
  );
});

const styles = ScaledSheet.create({
  view: {
    width: '100%',
  },
  container: {
    marginVertical: '8@ms',
    width: '100%',
    borderRadius: '8@ms',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '16@s',
  },
  input: {
    fontSize: '16@ms',
    ...stylesCommon.fontWeight500,
    paddingVertical: '14@vs',
  },
  txtTxtError: {
    fontSize: '12@ms',
    ...stylesCommon.fontWeight500,
    marginBottom: '8@ms',
    color: 'red',
    textAlign: 'left',
  },
});

export {AppInput};
