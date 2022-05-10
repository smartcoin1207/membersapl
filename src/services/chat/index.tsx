import api from '../api';

const GET_LIST_ROOM = 'user/chat/rooms';
const GET_LIST_USER = 'user/list';
const CREATE_ROOM_LIST = 'user/chat/create-room';
const REMOVE_USER = 'user/chat/room/remove-member';
const DETAIL_ROOM_CHAT = 'user/chat/room';
const UPDATE_INFO_ROOM_CHAT = 'user/chat/room/update-info';
const INVITE_MEMBER = 'user/chat/room/invite-member';
const PIN_FLAG = 'user/chat/room/pin-flag';
const LEAVE_ROOM = 'user/chat/room/leave';

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

export const inviteMember: any = async (body: any) => {
  const response = api.post(INVITE_MEMBER, body);
  return response;
};

export const pinFlag: any = async (id: any, status: any) => {
  const response = api.get(`${PIN_FLAG}/${id}?status=${status}`);
  return response;
};

export const leaveRoomChat: any = async (body: any) => {
  const response = api.post(LEAVE_ROOM, body);
  return response;
};
