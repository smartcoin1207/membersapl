import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  BackHandler,
} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat} from '@images';
import {Item} from './component/Item';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';
import {Menu} from 'react-native-material-menu';
import {MenuOption} from './component/MenuOption';
import {
  getRoomList,
  getUserInfo,
  saveIdRoomChat,
  saveMessageReply,
  resetDataChat,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {ModalSearchMessage} from './component/ModalSearchMessage';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

import {AppSocket, AppNotification} from '@util';

import {io, Socket} from 'socket.io-client';
import {
  getDetailMessageSocket,
  getDetailMessageSocketCurrent,
  getDetailMessageSocketSeen,
} from '@redux';

import {EVENT_SOCKET} from '@util';
import { store } from '../../../redux/store';

const ListChat = () => {
  const refInput = useRef<any>(null);
  // let {endConnect, onHanleEvent} = AppSocket;
  let {initFB} = AppNotification;
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listRoom = useSelector((state: any) => state.chat.roomList);
  const paging = useSelector((state: any) => state.chat.pagingListRoom);

  const idCompany = useSelector((state: any) => state.chat.idCompany);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [key, setKey] = useState<string>('');
  const [page, setPage] = useState(1);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchMessage, setShowSearchMessage] = useState<boolean>(false);

let socket = io('');



  useFocusEffect(
    useCallback(() => {
      dispatch(saveIdRoomChat(null));
      dispatch(saveMessageReply(null));
      dispatch(resetDataChat());
      dispatch(getRoomList({key: key, company_id: idCompany, page: 1}));
    }, []),
  );

  let ws_token = useSelector((state: any) => state?.auth?.userInfo?.ws_token);
  React.useEffect(()=>{
    console.log(ws_token)
    if(ws_token){
      console.log('========',ws_token)
      init(ws_token)
      return () =>{
        endConnect()
      }
    }
  }, [ws_token])



  useEffect(() => {
    initFB();
    if (user?.id) {
      onHanleEvent();
      dispatch(getUserInfo(user?.id));
    }
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
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
  }, [page, idCompany]);

  const onChangeText = (text: any) => {
    setKey(text);
    debounceText(text);
  };
  const renderItem = ({item, index}: any) => {
    return <Item item={item} index={index} />;
  };

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

  const onShowOption = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const onSearchRoom = useCallback(() => {
    setShowMenu(false);
    setTimeout(() => {
      refInput?.current?.focusInput();
    }, 500);
  }, []);

  const onSearchMessage = useCallback(() => {
    setShowMenu(false);
    setTimeout(() => {
      setShowSearchMessage(true);
    }, 500);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowSearchMessage(!showSearchMessage);
  }, [showSearchMessage]);




  const init = (token?: string) => {
    
    let SOCKET_CONFIG = {
      autoConnect: false,
      auth: {
        token: token || store.getState()?.auth?.userInfo?.ws_token,
      },
    };
    
    socket = io('https://stage-v3mbs-msg01.mem-bers.jp:443', SOCKET_CONFIG);
    socket.connect();
    console.log
    setTimeout(() => {}, 2000);
  };

  const onHanleEvent = () => {
    socket.on(EVENT_SOCKET.CONNECT, () => {
      console.log('CONNECTED', socket);
    });
    socket.on(EVENT_SOCKET.NEW_MESSAGE_IND, data => {
      const state = store.getState();
      if (data?.user_id !== state?.auth?.userInfo?.id) {
        if (data?.room_id == state?.chat?.id_roomChat) {
          store.dispatch(getDetailMessageSocket(data?.message_id));
        } else {
        }
      } else {
        store.dispatch(getDetailMessageSocketCurrent(data?.message_id));
      }
    });

    socket.on(EVENT_SOCKET.CHAT_GROUP_UPDATE_IND, data => {
      const state = store.getState();
      if (data?.member_info?.ids?.includes(state?.auth?.userInfo?.id)) {
        store.dispatch(
          getRoomList({company_id: state?.chat?.idCompany, search: null}),
        );
      } else {
      }
    });

    socket.on(EVENT_SOCKET.NEW_MESSAGE_CONF, async data => {
      const state = store.getState();
      if (data?.user_id !== state?.auth?.userInfo?.id) {
        if (data?.room_id == state?.chat?.id_roomChat) {
          const body = {
            idMsg: data?.message_id,
            idUser: data?.user_id,
          };
          store.dispatch(getDetailMessageSocketSeen(body));
        } else {
        }
      } else {
      }
    });
    socket.on(EVENT_SOCKET.DISCONNECT, () => {});
  };
  const endConnect = () => {
    socket.disconnect();
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
          ref={refInput}
          placeholder="グループ名、メッセージ内容を検索"
          onChange={onChangeText}
          value={key}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
          icon={iconSearch}
          styleIcon={styles.icon}
          showObtion={true}
          onShowOption={onShowOption}
        />
        <View style={styles.viewOption}>
          <Menu
            style={styles.containerMenu}
            visible={showMenu}
            onRequestClose={onShowOption}
            key={1}>
            <MenuOption
              onSearchRoom={onSearchRoom}
              onSearchMessage={onSearchMessage}
            />
          </Menu>
        </View>
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
      <ModalSearchMessage visible={showSearchMessage} onClose={onCloseModal} />
    </View>
  );
};

export {ListChat};
