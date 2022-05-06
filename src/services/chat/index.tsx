import api from '../api';

const GET_LIST_ROOM = 'user/chat/rooms';
const GET_LIST_USER = 'user/list';
const CREATE_ROOM_LIST = 'user/chat/create-room';

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
