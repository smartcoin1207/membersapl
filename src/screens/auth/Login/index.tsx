import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {logo} from '@images';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@stylesCommon';
import {Formik} from 'formik';
import * as yup from 'yup';
import {validateForm} from '@util';
import {useDispatch} from 'react-redux';
import {demoActionChange, login} from '@redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppButton, AppInput} from '@component';

const Login = () => {
  const dispatch = useDispatch();
  const formInitialValues = {
    login: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    login: validateForm().login,
    password: validateForm().password,
  });

  const onSubmit = useCallback((value: any) => {
    dispatch(login(value));
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.view}>
      <View style={styles.container}>
        <Image style={styles.image} source={logo} />
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={onSubmit}>
          {props => {
            return (
              <View style={styles.linearGradient}>
                <View style={styles.viewContent}>
                  <Text style={styles.txtTitleLogin}>
                    すでにメンバーの方はこちらメールアドレスとパスワードをご入力の上、ログインしてください。
                  </Text>
                  <AppInput
                    placeholder="メールアドレス"
                    onChange={props.handleChange('login')}
                    value={props.values.login}
                    error={props.errors.login}
                  />
                  <AppInput
                    placeholder="パスワード"
                    onChange={props.handleChange('password')}
                    value={props.values.password}
                    error={props.errors.password}
                    secureTextEntry={true}
                  />
                  <AppButton
                    title="グループを追加"
                    onPress={props.handleSubmit}
                    disabled={
                      props.values.login?.length === 0 ||
                      props.values.password?.length === 0
                    }
                  />
                  <View style={styles.viewBottom}>
                    <TouchableOpacity>
                      <Text style={styles.txtBottom}>
                        パスワードをお忘れの場合
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export {Login};
