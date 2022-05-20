import {defaultAvatar} from '@images';
import moment from 'moment';
import React, {useMemo, useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailListChat, deleteMessage} from '@redux';
import {deleteMessageApi, GlobalService, detailRoomchat} from '@services';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export const useFunction = (props: any) => {
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const listChat = useSelector((state: any) => state.chat?.detailChat);
  const dispatch = useDispatch();
  const {route} = props;
  const {idRoomChat} = route?.params;
  const [visible, setVisible] = useState(false);
  const [dataDetail, setData] = useState<any>(null);

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

  return {
    chatUser,
    idRoomChat,
    visible,
    onShowMenu,
    getConvertedMessages,
    listChat,
    deleteMsg,
    dataDetail
  };
};
