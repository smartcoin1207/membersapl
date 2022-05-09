import api from '../api';

const GET_LIST_ROOM = 'user/chat/rooms';
const GET_LIST_USER = 'user/list';
const CREATE_ROOM_LIST = 'user/chat/create-room';
const REMOVE_USER = 'user/chat/room/remove-member';
const DETAIL_ROOM_CHAT = 'user/chat/room';
const UPDATE_INFO_ROOM_CHAT = 'user/chat/room/update-info';

export const getRoomListApi: any = async (params: any) => {
  const {key} = params;
  const response = await api.get(`${GET_LIST_ROOM}?search=${key}`);
  return response;
};

export const getListUser: any = async (params: any) => {
  const response = api.get(GET_LIST_USER, {params});
  return response;
};

export const createRoom: any = async (body: any) => {
  const response = api.post(CREATE_ROOM_LIST, body);
  return response;
};

export const removeUser: any = async (body: any) => {
  const response = api.post(REMOVE_USER, body);
  return response;
};

export const detailRoomchat: any = async (id: any) => {
  const response = await api.get(`${DETAIL_ROOM_CHAT}/${id}`);
  return response;
};

export const updateInfoRoomchat: any = async (body: any) => {
  const response = api.post(UPDATE_INFO_ROOM_CHAT, body);
  return response;
};
