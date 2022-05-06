import {typeChat} from './type';
import {INITIAL_STATE_CHAT} from './state';

export default function chatReducer(state = INITIAL_STATE_CHAT, action: any) {
  switch (action.type) {
    case typeChat.GET_ROOM_LIST_SUCCESS:
      return {
        ...state,
        roomList: action.payload,
      };
    default:
      return state;
  }
}
