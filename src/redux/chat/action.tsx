import {typeChat} from './type';

export const getRoomList = (payload: any) => ({
  type: typeChat.GET_ROOM_LIST,
  payload,
});

export const getRoomListSuccess = (payload: any) => ({
  type: typeChat.GET_ROOM_LIST_SUCCESS,
  payload,
});
