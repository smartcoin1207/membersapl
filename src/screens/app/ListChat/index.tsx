import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat} from '@images';
import {Item} from './component/Item';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';

import {
  getRoomList,
  getUserInfo,
  saveIdRoomChat,
  saveMessageReply,
  resetDataChat,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

import {AppSocket, AppNotification} from '@util';

const ListChat = () => {
  let {endConnect, init} = AppSocket;
  let {initFB} = AppNotification;
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listRoom = useSelector((state: any) => state.chat.roomList);
  const paging = useSelector((state: any) => state.chat.pagingListRoom);

  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [key, setKey] = useState<string>('');
  const [page, setPage] = useState(1);

  useFocusEffect(
    useCallback(() => {
      dispatch(saveIdRoomChat(null));
      dispatch(saveMessageReply(null));
      dispatch(resetDataChat());
      dispatch(getRoomList({key: key, company_id: idCompany, page: 1}));
    }, []),
  );

  useEffect(() => {
    initFB();
    if (user?.id) {
      init();
      dispatch(getUserInfo(user?.id));
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      dispatch(getRoomList({key: key, company_id: idCompany, page: page}));
    }
  }, [page]);

  const debounceText = useCallback(
    debounce(
      text =>
        dispatch(getRoomList({key: text, company_id: idCompany, page: page})),
      500,
    ),
    [],
  );

  const onRefresh = useCallback(() => {
    setPage(1);
    dispatch(getRoomList({key: key, company_id: idCompany, page: 1}));
  }, [page]);

  const onChangeText = (text: any) => {
    setKey(text);
    debounceText(text);
  };
  const renderItem = ({item}: any) => <Item item={item} />;

  const onCreate = useCallback(() => {
    navigation.navigate(ROUTE_NAME.CREATE_ROOM_CHAT, {typeScreen: 'CREATE'});
  }, []);

  const handleLoadMore = () => {
    if (page === paging?.last_page) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="チャットグループ一覧"
        imageCenter
        onRightFirst={onCreate}
        iconRightFirst={iconAddListChat}
        styleIconRightFirst={styles.colorIcon}
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
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export {ListChat};
