import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {Header, ModalConfirm} from '@component';
import {
  defaultAvatar,
  iconCamera,
  iconDelete,
  iconEdit,
  iconDetailRow,
  iconUser,
  iconLogout,
  iconPin,
} from '@images';
import {ViewItem} from './components/ViewItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {detailRoomchat, pinFlag, leaveRoomChat, GlobalService} from '@services';
import {showMessage} from 'react-native-flash-message';

const InfoRoomChat = (props: any) => {
  const {route} = props;
  const {idRoomChat} = route?.params;
  const navigation = useNavigation<any>();

  const [dataDetail, setData] = useState<any>(null);
  const [activePin, setActivePin] = useState<any>(false);
  const [modal, setModal] = useState<boolean>(false);

  const getDetail = async () => {
    try {
      const response = await detailRoomchat(idRoomChat);
      setData(response?.data?.room);
    } catch {}
  };

  const onCancelModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  useFocusEffect(
    useCallback(() => {
      getDetail();
    }, []),
  );

  useEffect(() => {
    if (dataDetail?.pin_flag == 0) {
      setActivePin(false);
    } else {
      setActivePin(true);
    }
  }, [dataDetail?.pin_flag]);

  const onGhimRoomChat = async () => {
    try {
      const response = await pinFlag(
        idRoomChat,
        dataDetail?.pin_flag == 0 ? 1 : 0,
      );
      showMessage({
        message: response?.data?.message,
        type: 'success',
      });
      getDetail();
    } catch {}
  };

  const onLeave = async () => {
    try {
      onCancelModal();
      const body = {
        room_id: idRoomChat,
      };
      const response = await leaveRoomChat(body);
      navigation.pop(2);
    } catch {}
  };

  return (
    <View style={styles.container}>
      <Header title="チャットグループの情報" back imageCenter />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.viewHeader}>
            <View style={styles.viewAvatar}>
              <Image source={defaultAvatar} style={styles.avatar} />
              <TouchableOpacity
                style={styles.buttonGhim}
                onPress={onGhimRoomChat}>
                <Image
                  source={iconPin}
                  style={activePin === false ? styles.inActive : null}
                />
              </TouchableOpacity>
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
                dataDetail: dataDetail,
              });
            }}
          />
          <ViewItem
            sourceImage={iconLogout}
            content="グループを退出"
            isLogout
            hideBorder
            hideNext
            onClick={onCancelModal}
          />
        </ScrollView>
      </View>
      <ModalConfirm
        visible={modal}
        onCancel={onCancelModal}
        titleHeader="本当にログアウトしますか？"
        onConfirm={onLeave}
      />
    </View>
  );
};

export {InfoRoomChat};
