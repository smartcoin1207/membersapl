import {typeChat} from './type';

export const getRoomList = (payload: any) => ({
  type: typeChat.GET_ROOM_LIST,
  payload,
});

export const getRoomListSuccess = (payload: any) => ({
  type: typeChat.GET_ROOM_LIST_SUCCESS,
  payload,
});

export const getDetailListChat = (payload: any) => ({
  type: typeChat.GET_DETAIL_LIST_CHAT,
  payload,
});

export const getDetailListChatSuccess = (payload: any) => ({
  type: typeChat.GET_DETAIL_LIST_CHAT_SUCCESS,
  payload,
});

export const saveIdCompany = (payload: any) => ({
  type: typeChat.SAVE_ID_COMPANY,
  payload,
});

export const deleteMessage = (payload: any) => ({
  type: typeChat.DELETE_MESSAGE,
  payload,
});

export const pinMessage = (payload: any) => ({
  type: typeChat.PIN_MESSAGE,
  payload,
});

export const saveIdRoomChat = (payload: any) => ({
  type: typeChat.SAVE_ID_ROOMCHAT,
  payload,
});

export const getDetailMessageSocket = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET,
  payload,
});

export const getDetailMessageSocketSuccess = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_SUCCESS,
  payload,
});
