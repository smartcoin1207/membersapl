import {defaultAvatar} from '@images';
import moment from 'moment';
import React, {useMemo, useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailListChat, deleteMessage} from '@redux';
import {
  deleteMessageApi,
  GlobalService,
  detailRoomchat,
  sendMessageApi,
} from '@services';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {AppSocket} from '@util';

export const useFunction = (props: any) => {
  const {socket} = AppSocket;
  const navigation = useNavigation<any>();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const listChat = useSelector((state: any) => state.chat?.detailChat);
  const message_pinned = useSelector(
    (state: any) => state.chat?.message_pinned,
  );
  const dispatch = useDispatch();
  const {route} = props;
  const {idRoomChat} = route?.params;
  const [visible, setVisible] = useState(false);
  const [dataDetail, setData] = useState<any>(null);

  const navigateToDetail = () => {
    navigation.navigate(ROUTE_NAME.INFO_ROOM_CHAT, {idRoomChat: idRoomChat});
  };

  const convertDataMessage = useCallback((message: any) => {
    return {
      _id: message?.id,
      text: message?.message,
      createdAt: message?.created_at,
      user: {
        _id: message?.from_id,
        avatar: message?.user_send?.icon_image,
      },
      reaction: message?.reactions,
    };
  }, []);

  const getConvertedMessages = useCallback((msgs: any) => {
    return msgs?.map((item: any) => {
      return convertDataMessage(item);
    });
  }, []);

  const chatUser = useMemo(() => {
    return {
      _id: user_id,
    };
  }, []);

  const getListChat = () => {
    const data = {
      id: idRoomChat,
    };
    dispatch(getDetailListChat(data));
  };

  useEffect(() => {
    getListChat();
  }, []);

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

  const onShowMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const deleteMsg = useCallback(
    async (id: any) => {
      try {
        GlobalService.showLoading();
        const res = await deleteMessageApi(id, idRoomChat);
        dispatch(deleteMessage(id));
        GlobalService.hideLoading();
      } catch (error: any) {
        GlobalService.hideLoading();
      }
    },
    [idRoomChat],
  );

  const sendMessage = useCallback(async mes => {
    try {
      const data = new FormData();
      data.append('room_id', idRoomChat);
      data.append('from_id', mes[0]?.user?._id);
      data.append('message', mes[0]?.text);
      const res = await sendMessageApi(data);

      console.log('SOCKET', socket);

      socket.emit('message_ind', {
        user_id: mes[0]?.user?._id,
        room_id: idRoomChat,
        task_id: null,
        to_info: null,
        level: res?.data?.data?.level,
        message_id: res?.data?.data?.id,
        message_type: res?.data?.data?.type,
        method: res?.data?.data?.method,
        attachment_files: res?.data?.attachmentFiles,
        stamp_no: res?.data?.data?.stamp_no,
        relation_message_id: res?.data?.data?.reply_to_message_id,
        text: res?.data?.data?.message,
        text2: null,
        time: res?.data?.data?.created_at,
      });
    } catch (error: any) {}
  }, []);

  const updateGimMessage = useCallback(() => {
    try {
    } catch (error: any) {}
  }, [message_pinned?.id]);

  return {
    chatUser,
    idRoomChat,
    visible,
    onShowMenu,
    getConvertedMessages,
    listChat,
    deleteMsg,
    dataDetail,
    sendMessage,
    navigateToDetail,
    message_pinned,
    updateGimMessage,
  };
};
