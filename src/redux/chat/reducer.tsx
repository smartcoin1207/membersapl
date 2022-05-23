import {typeChat} from './type';
import {INITIAL_STATE_CHAT} from './state';

export default function chatReducer(state = INITIAL_STATE_CHAT, action: any) {
  switch (action.type) {
    case typeChat.SAVE_ID_COMPANY:
      return {
        ...state,
        idCompany: action.payload,
      };
    case typeChat.GET_ROOM_LIST_SUCCESS:
      return {
        ...state,
        roomList: action.payload,
      };
    case typeChat.GET_DETAIL_LIST_CHAT_SUCCESS:
      return {
        ...state,
        detailChat: action.payload.room_messages.data,
        pagingDetail: action.payload.room_messages.paging,
        message_pinned: action.payload.messeage_pinned,
      };
    case typeChat.DELETE_MESSAGE:
      const {detailChat} = state;
      let data = [...detailChat];
      const index = data.findIndex(
        (element: any) => element?.id == action.payload,
      );
      if (index > -1) {
        data.splice(index, 1);
      }
      return {
        ...state,
        detailChat: data,
      };
    case typeChat.PIN_MESSAGE:
      return {
        ...state,
        message_pinned: action.payload,
      };
    default:
      return state;
  }
}
