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
import {demoActionChange} from '@redux';

import {AppButton, AppInput} from '@component';

const Login = () => {
  const dispatch = useDispatch();
  const formInitialValues = {
    email: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    email: validateForm().email,
    password: validateForm().password,
  });

  const onSubmit = useCallback((value: any) => {
    dispatch(demoActionChange(1));
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} />
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {props => {
          return (
            <LinearGradient
              colors={colors.colorGradient}
              style={styles.linearGradient}>
              <View style={styles.viewContent}>
                <Text style={styles.txtTitleLogin}>
                  すでにメンバーの方はこちらメールアドレスとパスワードをご入力の上、ログインしてください。
                </Text>
                <AppInput
                  placeholder="メールアドレス"
                  onChange={props.handleChange('email')}
                  value={props.values.email}
                  error={props.errors.email}
                />
                <AppInput
                  placeholder="パスワード"
                  onChange={props.handleChange('password')}
                  value={props.values.password}
                  error={props.errors.password}
                />
                <AppButton
                  title="グループを追加"
                  onPress={props.handleSubmit}
                />
                <View style={styles.viewBottom}>
                  <TouchableOpacity>
                    <Text style={styles.txtBottom}>
                      パスワードをお忘れの場合
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          );
        }}
      </Formik>
    </View>
  );
};

export {Login};
