import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat} from '@images';
import {Item} from './components/Item';
import {useFocusEffect} from '@react-navigation/native';

import {getRoomList} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {getListUser, GlobalService, removeUser} from '@services';

import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

const ListUser = (props: any) => {
  const {route} = props;
  const {idRoomChat, dataDetail} = route?.params;
  const navigation = useNavigation<any>();
  const [listUser, setListUser] = useState([]);
  const renderItem = ({item}: any) => (
    <Item
      item={item}
      deleteUser={(value: any) => {
        deleteUser(value);
      }}
      is_host={dataDetail?.is_host}
    />
  );

  const deleteUser = async (value: any) => {
    try {
      GlobalService.showLoading();
      const body = {
        room_id: idRoomChat,
        user_id: value?.id,
      };
      const result = await removeUser(body);
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
      const result = await getListUser({room_id: idRoomChat});
      setListUser(result?.data?.users?.data);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getListUserOfRoom();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header
        title="メンバー"
        imageCenter
        onRightFirst={onCreate}
        // onRightFirst={dataDetail?.is_host === 1 ? onCreate : null}
        iconRightFirst={iconAddListChat}
        back
      />
      <View style={styles.viewContent}>
        <FlatList
          data={listUser}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export {ListUser};
