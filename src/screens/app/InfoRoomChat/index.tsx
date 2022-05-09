import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import {
  defaultAvatar,
  iconCamera,
  iconDelete,
  iconEdit,
  iconDetailRow,
  iconUser,
  iconLogout,
} from '@images';
import {ViewItem} from './components/ViewItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {detailRoomchat} from '@services';

const InfoRoomChat = (props: any) => {
  const {route} = props;
  const {idRoomChat} = route?.params;
  const navigation = useNavigation<any>();

  const [dataDetail, setData] = useState<any>(null);

  const getDetail = async () => {
    try {
      const response = await detailRoomchat(idRoomChat);
      setData(response?.data?.room);
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      getDetail();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header title="チャットグループの情報" back imageCenter />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.viewHeader}>
            <View style={styles.viewAvatar}>
              <Image source={defaultAvatar} style={styles.avatar} />
              <TouchableOpacity style={styles.buttonCamera}>
                <Image source={iconCamera} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete}>
                <Image source={iconDelete} />
              </TouchableOpacity>
            </View>
          </View>
          <ViewItem
            sourceImage={iconEdit}
            title="表示名"
            content={dataDetail?.name}
            onClick={() => {
              navigation.navigate(ROUTE_NAME.EDIT_ROOM_CHAT, {
                idRoomChat: idRoomChat,
                dataDetail: dataDetail,
              });
            }}
          />
          <ViewItem
            sourceImage={iconDetailRow}
            title="メールアドレス "
            content={dataDetail?.summary_column}
            onClick={() => {
              navigation.navigate(ROUTE_NAME.EDIT_ROOM_CHAT, {
                idRoomChat: idRoomChat,
                dataDetail: dataDetail,
              });
            }}
          />
          <ViewItem
            sourceImage={iconUser}
            content="メンバー"
            onClick={() => {
              navigation.navigate(ROUTE_NAME.LIST_USER, {
                idRoomChat: idRoomChat,
              });
            }}
          />
          <ViewItem
            sourceImage={iconLogout}
            content="グループを退出"
            isLogout
            hideBorder
            hideNext
            onClick={() => {}}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export {InfoRoomChat};
