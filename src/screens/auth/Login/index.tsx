import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

import {useSelector, useDispatch} from 'react-redux';
import {demoActionChange} from '@redux';

import {AppButton, AppInput} from '@component';

const Login = () => {
  const dispatch = useDispatch();
  const demoState = useSelector((state: any) => state?.demo?.number);

  const [value, setValue] = useState<string>();

  const onChangeState = useCallback(() => {
    dispatch(demoActionChange(demoState + 1));
  }, [demoState]);

  const onChange = useCallback(
    (txt: string) => {
      setValue(txt);
    },
    [value],
  );

  return (
    <View style={styles.container}>
      <Text>Nomar: {demoState}</Text>
      <Text style={styles.txtFontMedium}>Medium: {demoState}</Text>
      <Text style={styles.txtFontBold}>Bold: {demoState}</Text>

      <AppInput
        placeholder="メールアドレス"
        onChange={onChange}
        value={value}
        error="Error"
      />
      <AppButton title="グループを追加" onPress={onChangeState} />
    </View>
  );
};

export {Login};
