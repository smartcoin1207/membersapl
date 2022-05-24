import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat} from '@images';
import {Item} from './component/Item';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';

import {getRoomList, getUserInfo, saveIdRoomChat} from '@redux';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

import {AppSocket} from '@util';

const ListChat = () => {
  let {init, endConnect} = AppSocket;
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listRoom = useSelector((state: any) => state.chat.roomList?.data);
  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [key, setKey] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      dispatch(saveIdRoomChat(null));
      dispatch(getRoomList({key: key, company_id: idCompany}));
    }, []),
  );

  useEffect(() => {
    if (user?.id) {
      init();
      dispatch(getUserInfo(user?.id));
    }
  }, []);

  const debounceText = useCallback(
    debounce(
      text => dispatch(getRoomList({key: key, company_id: idCompany})),
      500,
    ),
    [],
  );

  const onChangeText = (text: any) => {
    setKey(text);
    debounceText(text);
  };
  const renderItem = ({item}: any) => <Item item={item} />;

  const onCreate = useCallback(() => {
    navigation.navigate(ROUTE_NAME.CREATE_ROOM_CHAT, {typeScreen: 'CREATE'});
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="チャットグループ一覧"
        imageCenter
        onRightFirst={onCreate}
        iconRightFirst={iconAddListChat}
      />
      <View style={styles.viewContent}>
        <AppInput
          placeholder="チャット名、メッセージ内容を検索"
          onChange={onChangeText}
          value={key}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
          icon={iconSearch}
          styleIcon={styles.icon}
        />
        <FlatList
          data={listRoom}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
        />
      </View>
    </View>
  );
};

export {ListChat};
