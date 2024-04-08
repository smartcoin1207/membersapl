import {Header, ModalConfirm} from '@component';
import {IS_IOS} from '@constants/dimensions';
import {
  defaultAvatar,
  iconBell,
  iconBook,
  iconDocument,
  iconLogout,
} from '@images';
import {useNavigation} from '@react-navigation/native';
import {logOut, saveInfoUser} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {updateImageProfile} from '@services';
import {AppNotification, AppSocket} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Linking, ScrollView, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {ViewItem} from './components/ViewItem';
import {styles} from './styles';

const Setting = () => {
  const {removeBadge} = AppNotification;
  const {endConnect} = AppSocket;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const navigation = useNavigation<any>();
  const [modal, setModal] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const onCancelModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onLogout = useCallback(() => {
    endConnect();
    onCancelModal();
    dispatch(logOut());
    removeBadge();
  }, [modal]);

  const uploadImageApi = async () => {
    try {
      const data = new FormData();
      const imageUpload = {
        uri: IS_IOS ? image?.path.replace('file://', '') : image?.path,
        type: 'image/jpeg',
        name: image?.filename ? image?.filename : image?.path,
      };
      data.append('file', imageUpload);
      const res = await updateImageProfile(data);
      await showMessage({
        message: res?.data?.message,
        type: 'success',
      });
      await dispatch(saveInfoUser(res?.data?.user_info));
      setImage(null);
    } catch (error) {}
  };

  useEffect(() => {
    if (image) {
      uploadImageApi();
    }
  }, [image]);

  // const upLoadImage = () => {
  //   ImagePicker.openPicker({
  //     cropping: true,
  //     width: verticalScale(126),
  //     height: verticalScale(126),
  //   })
  //     .then(async (image: any) => {
  //       setImage(image);
  //     })
  //     .catch(err => {});
  // };

  return (
    <View style={styles.container}>
      <Header title="その他" imageCenter />
      <View style={styles.container}>
        <ScrollView alwaysBounceVertical={false}>
          <LinearGradient
            colors={['#1AA1AA', '#989898']}
            style={styles.viewHeader}>
            <View style={styles.viewAvatar}>
              {user?.icon_image ? (
                <Image source={{uri: user?.icon_image}} style={styles.avatar} />
              ) : (
                <Image source={defaultAvatar} style={styles.avatar} />
              )}
            </View>
            <View style={styles.viewInfoTxt}>
              <Text
                style={
                  styles.txtName
                }>{`${user?.last_name} ${user?.first_name}`}</Text>
              <Text style={styles.txtMail}>{user?.mail}</Text>
            </View>
          </LinearGradient>
          <ViewItem
            sourceImage={iconBell}
            content="通知設定"
            onPress={() => {
              navigation.navigate(ROUTE_NAME.CONFIG_NOTI);
            }}
          />
          <ViewItem
            sourceImage={iconDocument}
            content="規約と条件"
            onPress={() => {
              Linking.openURL('https://mem-bers.jp/term');
            }}
          />
          <ViewItem
            sourceImage={iconBook}
            content="使い方"
            onPress={() => {
              Linking.openURL('https://manual.mem-bers.jp');
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

export {Setting};
