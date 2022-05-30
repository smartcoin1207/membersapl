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
const UPDATE_IMAGE_ROOM_CHAT = 'user/chat/room/update-avatar';
const DETAIL_CHAT = 'user/chat/room';
const DELETE_MESSAGE = 'user/chat/room/delete-message';
const SEND_MESSAGE = 'user/chat/room/send-message';
const PIN_MESSAGE = 'user/chat/room/pin-message';
const GET_MESSAGE_FROM_SOCKET = 'user/chat/get_chat_message_info_for_websocket';
const REPLY_MESSAGE = 'user/chat/room/reply-message';
const EDIT_MESSAGE = 'user/chat/room/update-message';
const SEND_REACTION = 'user/chat/room/send-reaction-message';
const GET_LIST_REACTION = 'user/chat/room/list-reactions';
const REMOVE_REACTION = 'user/chat/room/remove-reaction-message';

export const getRoomListApi: any = async (params: any) => {
  const {key, company_id, page} = params;
  const response = await api.get(
    `${GET_LIST_ROOM}?company_id=${company_id}&page=${
      page ? page : 1
    }&search=${key}`,
  );
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

export const updateImageRoomChat: any = async (body: any) => {
  const response = api.post(UPDATE_IMAGE_ROOM_CHAT, body);
  return response;
};

export const getDetailChatApi: any = async (params: any) => {
  const {id, page} = params;
  const response = api.get(
    `${DETAIL_CHAT}/${id}/message?page=${page ? page : 1}`,
  );
  return response;
};

export const deleteMessageApi: any = async (idMessage: any, idRoom: any) => {
  const response = api.post(`${DELETE_MESSAGE}/${idMessage}?room_id=${idRoom}`);
  return response;
};

export const editMessageApi: any = async (idMessage: any, params: any) => {
  const response = api.post(`${EDIT_MESSAGE}/${idMessage}`, params);
  return response;
};

export const sendMessageApi: any = async (body: any) => {
  const response = api.post(SEND_MESSAGE, body);
  return response;
};

export const pinMessageApi: any = async (id: any, status: any) => {
  const response = api.get(`${PIN_MESSAGE}/${id}?pin_flag=${status}`);
  return response;
};

export const getMessageFromSocket: any = async (body: any) => {
  const response = api.post(GET_MESSAGE_FROM_SOCKET, body);
  return response;
};

export const replyMessageApi: any = async (body: any) => {
  const response = api.post(REPLY_MESSAGE, body);
  return response;
};

export const sendReactionApi: any = async (body: any) => {
  const response = api.post(SEND_REACTION, body);
  return response;
};

export const getListReactionApi: any = async (id: any) => {
  const response = api.post(`${GET_LIST_REACTION}/${id}`);
  return response;
};

export const removeReactionApi: any = async (body: any) => {
  const response = api.post(REMOVE_REACTION, body);
  return response;
};
