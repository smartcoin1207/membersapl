import {Formik} from 'formik';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {AppButton, AppInput, Header} from '@component';
import {iconClose} from '@images';
import {useNavigation} from '@react-navigation/native';
import {saveInfoUser} from '@redux';
import {GlobalService, updateProfile} from '@services';
import {validationSchemaEmail, validationSchemaName} from '@util';

import {styles} from './styles';

const getInitialValues = (type: 'Name' | 'Email', user: any) => {
  if (!user) {
    return;
  }

  const formInitialValuesName = {
    first_name: user.first_name,
    last_name: user.last_name,
    addition: user.addition,
  };

  const formInitialValuesEmail = {
    email: user.mail,
  };

  return type === 'Name' ? formInitialValuesName : formInitialValuesEmail;
};

const EditUser = ({route}: any) => {
  const {type} = route?.params;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSubmit = async (value: any) => {
    const body = {
      ...value,
      type: type === 'Email' ? 'email' : 'name',
    };
    try {
      GlobalService.showLoading();
      const res = await updateProfile(body);
      dispatch(saveInfoUser(res?.data?.user_info));
      onBack();
      GlobalService.hideLoading();
    } catch {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="個人情報"
        imageCenter
        iconRightFirst={iconClose}
        onRightFirst={onBack}
      />
      <View style={styles.viewContent}>
        <Formik
          initialValues={getInitialValues(type, user)}
          validationSchema={
            type === 'Name' ? validationSchemaName : validationSchemaEmail
          }
          validateOnChange={false}
          onSubmit={handleSubmit}>
          {props => {
            return (
              <View style={styles.linearGradient}>
                <KeyboardAwareScrollView
                  alwaysBounceVertical={false}
                  style={styles.viewForm}
                  showsVerticalScrollIndicator={false}>
                  {type === 'Name' ? (
                    <>
                      <Text style={styles.txtTitle}>姓</Text>
                      <AppInput
                        placeholder="姓"
                        onChange={props.handleChange('last_name')}
                        value={props.values.last_name}
                        error={props.errors.last_name}
                      />
                      <Text style={styles.txtTitle}>名</Text>
                      <AppInput
                        placeholder="名"
                        onChange={props.handleChange('first_name')}
                        value={props.values.first_name}
                        error={props.errors.first_name}
                      />

                      <Text style={styles.txtTitle}>補足情報</Text>
                      <AppInput
                        placeholder="補足情報"
                        onChange={props.handleChange('addition')}
                        value={props.values.addition}
                        error={props.errors.addition}
                      />
                    </>
                  ) : null}

                  {type === 'Email' ? (
                    <>
                      <Text style={styles.txtTitle}>Eメール</Text>
                      <AppInput
                        placeholder="Eメール"
                        onChange={props.handleChange('email')}
                        value={props.values.email}
                        error={props.errors.email}
                      />
                    </>
                  ) : null}

                  <AppButton
                    title="アップデート"
                    onPress={props.handleSubmit}
                    styleButton={styles.button}
                  />
                </KeyboardAwareScrollView>
              </View>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export {EditUser};
