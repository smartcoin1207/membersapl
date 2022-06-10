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

export const editMessageAction = (payload: any) => ({
  type: typeChat.EDIT_MESSAGE,
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

export const getDetailMessageSocketCurrent = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_CURRENT,
  payload,
});

export const getDetailMessageSocketSuccess = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE_SOCKET_SUCCESS,
  payload,
});

export const saveMessageReply = (payload: any) => ({
  type: typeChat.SAVE_MESSAGE_REPLY,
  payload,
});

export const saveMessageEdit = (payload: any) => ({
  type: typeChat.SAVE_MESSAGE_EDIT,
  payload,
});

export const resetDataChat = () => ({
  type: typeChat.RESET_DATA,
});

export const fetchResultMessageAction = (payload: any) => ({
  type: typeChat.FETCH_RESULT_SEARCH_MESSAGE,
  payload,
});

export const fetchResultMessageSuccess = (payload: any) => ({
  type: typeChat.RESULT_SEARCH_MESSAGE,
  payload,
});

export const saveIdMessageSearch = (payload: any) => ({
  type: typeChat.SAVE_MESSAGE_SEARCH,
  payload,
})

export const updateMessageSeen = (payload: any) => ({
  type: typeChat.UPDATE_MESSAGE_SEEN,
  payload,
})
