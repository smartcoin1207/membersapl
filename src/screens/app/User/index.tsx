import React, {useState, useCallback} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import LinearGradient from 'react-native-linear-gradient';
import {
  defaultAvatar,
  iconCamera,
  iconDelete,
  iconEdit,
  iconEmail,
  iconPassword,
  iconLogout,
} from '@images';
import {ViewItem} from './components/ViewItem';
import {ModalConfirm} from '@component';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();
  const [modal, setModal] = useState<boolean>(false);
  const [dataDetail, setData] = useState<any>(null);

  const onCancelModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onLogout = useCallback(() => {
    onCancelModal();
    dispatch(logOut());
  }, [modal]);

  return (
    <View style={styles.container}>
      <Header title="個人設定" imageCenter />
      <View style={styles.container}>
        <ScrollView>
          <LinearGradient
            colors={['#1AA1AA', '#989898']}
            style={styles.viewHeader}>
            <View style={styles.viewAvatar}>
              <Image source={defaultAvatar} style={styles.avatar} />
              <TouchableOpacity style={styles.buttonCamera}>
                <Image
                  source={iconCamera}
                  style={{tintColor: colors.darkGrayText}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete}>
                <Image
                  source={iconDelete}
                  style={{tintColor: colors.darkGrayText}}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <ViewItem
            sourceImage={iconEdit}
            title="表示名"
            content={`${user?.first_name} ${user?.last_name}`}
            onPress={() => {
              navigation.navigate(ROUTE_NAME.EDIT_USER);
            }}
          />
          <ViewItem
            sourceImage={iconEmail}
            title="メールアドレス "
            content={user?.mail}
            onPress={() => {
              navigation.navigate(ROUTE_NAME.EDIT_USER);
            }}
          />
          <ViewItem
            sourceImage={iconPassword}
            title="表示名"
            onPress={() => {
              navigation.navigate(ROUTE_NAME.CHANGE_PASSWORD);
            }}
          />
          <ViewItem
            sourceImage={iconLogout}
            content="ログアウト"
            isLogout
            hideBorder
            hideNext
            onPress={onCancelModal}
          />
        </ScrollView>
      </View>
      <ModalConfirm
        visible={modal}
        onCancel={onCancelModal}
        titleHeader="本当にログアウトしますか？"
        onConfirm={onLogout}
      />
    </View>
  );
};

export {User};
