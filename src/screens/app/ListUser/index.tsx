import {Header, ModalRemoveUser} from '@component';
import AppSafeView from '@component/AppSafeView';
import {iconAddUser} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {getDetailMessageSocketSuccess} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  getListUserOfRoomApi,
  GlobalService,
  removeUser,
  changeRole,
} from '@services';
import {AppSocket} from '@util';
import React, {useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Item} from './components/Item';
import {styles} from './styles';

const ListUser = (props: any) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const {route} = props;
  const {idRoomChat, is_admin} = route?.params;
  const navigation = useNavigation<any>();
  const [listUser, setListUser] = useState([]);
  const [nameUser, setNameUser] = useState<any>(null);
  const [idUser, setIdUser] = useState<any>(null);
  const [modal, setModal] = useState<boolean>(false);

  const callApiChangeRole = async (value: any, userId: any) => {
    try {
      GlobalService.showLoading();
      const body = {
        room_id: idRoomChat,
        user_id: Math.abs(userId),
        role: value,
      };
      await changeRole(body);
      getListUserOfRoom();
      GlobalService.hideLoading();
    } catch {
      GlobalService.hideLoading();
    }
  };

  const renderItem = ({item}: any) => (
    <Item
      item={item}
      deleteUser={(value: any) => {
        setIdUser(value?.id);
        setNameUser(
          value?.id < 0
            ? `${value?.name}`
            : `${value?.last_name}${value?.first_name}`,
        );
        onCancelModal();
      }}
      changeRole={(value: any, userId: any) => callApiChangeRole(value, userId)}
      showChange={is_admin === 1 ? true : false}
    />
  );

  const deleteUser = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        room_id: idRoomChat,
        user_id: idUser,
      };
      const result = await removeUser(body);
      socket.emit('message_ind2', {
        user_id: user_id,
        room_id: idRoomChat,
        task_id: null,
        to_info: null,
        level: result?.data?.data?.msg_level,
        message_id: result?.data?.data?.id,
        message_type: result?.data?.data?.msg_type,
        method: result?.data?.data?.method,
        // attachment_files: res?.data?.attachmentFiles,
        stamp_no: result?.data?.data?.stamp_no,
        relation_message_id: result?.data?.data?.reply_to_message_id,
        text: result?.data?.data?.message,
        text2: null,
        time: result?.data?.data?.created_at,
      });
      socket.emit('ChatGroup_update_ind2', {
        user_id: user_id,
        room_id: idRoomChat,
        member_info: {
          type: 1,
          ids: [user_id],
        },
        method: 12,
        room_name: null,
        task_id: null,
      });
      dispatch(getDetailMessageSocketSuccess([result?.data?.data]));
      getListUserOfRoom();
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onCreate = useCallback(() => {
    navigation.navigate(ROUTE_NAME.CREATE_ROOM_CHAT, {
      typeScreen: 'ADD_NEW_USER',
      idRoomchat: idRoomChat,
    });
  }, []);

  const getListUserOfRoom = async () => {
    try {
      const result = await getListUserOfRoomApi(idRoomChat);
      setListUser(result?.data?.users);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getListUserOfRoom();
    }, []),
  );

  const onCancelModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onConfirm = useCallback(() => {
    onCancelModal();
    deleteUser();
  }, [modal]);

  return (
    <AppSafeView style={styles.container}>
      <Header
        title="メンバー"
        imageCenter
        onRightFirst={is_admin === 1 ? onCreate : null}
        iconRightFirst={is_admin === 1 ? iconAddUser : null}
        back
        styleIconRightFirst={styles.colorIcon}
      />
      <View style={styles.viewContent}>
        <FlatList
          data={listUser}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ModalRemoveUser
        visible={modal}
        onCancel={onCancelModal}
        titleHeader="グループから削除する"
        onConfirm={onConfirm}
        nameUser={nameUser}
      />
    </AppSafeView>
  );
};

export {ListUser};
