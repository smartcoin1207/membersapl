import {typeChat} from './type';
import {INITIAL_STATE_CHAT} from './state';
import {convertArrUnique} from '@util';

export default function chatReducer(state = INITIAL_STATE_CHAT, action: any) {
  switch (action.type) {
    case typeChat.SAVE_ID_COMPANY:
      return {
        ...state,
        idCompany: action.payload,
      };
    case typeChat.GET_ROOM_LIST_SUCCESS:
      let pageList = action.payload.paging?.current_page;
      return {
        ...state,
        roomList:
          pageList === 1
            ? action.payload.data
            : state.roomList.concat(action.payload.data),
        pagingListRoom: action.payload.paging,
      };
    case typeChat.GET_DETAIL_LIST_CHAT_SUCCESS:
      console.log('hosotanidebugzzz');
      console.log(action.payload.room_messages.data[0]?.room_id);
      console.log(action.payload.room_messages.data[0]?.room_id);
      console.log(action.payload.room_messages.data);
      console.log('hosotanidebugzzz111');
      let page = action.payload.room_messages.paging?.current_page;
      const room_id = action.payload.room_messages.data[0]?.room_id;
      const cachedDetailChat = [];
      cachedDetailChat[room_id] = page === 1 ? convertArrUnique(action.payload.room_messages.data, 'id') : convertArrUnique(state.detailChat.concat(action.payload.room_messages.data), 'id')
      return {
        ...state,
        detailChat:
          //Load more list message detail
          page === 1
            ? convertArrUnique(action.payload.room_messages.data, 'id')
            : convertArrUnique(
                state.detailChat.concat(action.payload.room_messages.data),
                'id',
              ),
        pagingDetail: action.payload.room_messages.paging,
        message_pinned: action.payload.message_pinned,
        redLineId: action.payload.redline,
        cachedDetailChat: cachedDetailChat,
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
    case typeChat.EDIT_MESSAGE:
      const array = [...state.detailChat];
      const indexEdit = array.findIndex(
        (element: any) => element?.id == action.payload.id,
      );
      if (indexEdit > -1) {
        array[indexEdit] = action.payload.data;
      }
      return {
        ...state,
        detailChat: array,
      };
    case typeChat.PIN_MESSAGE:
      return {
        ...state,
        message_pinned: action.payload,
      };
    case typeChat.SAVE_ID_ROOMCHAT:
      return {
        ...state,
        id_roomChat: action.payload,
      };
    case typeChat.GET_DETAIL_MESSAGE_SOCKET_SUCCESS:
      return {
        ...state,
        detailChat: action.payload.concat(state.detailChat),
      };
    case typeChat.SAVE_MESSAGE_REPLY:
      return {
        ...state,
        messageReply: action.payload,
      };
    case typeChat.SAVE_MESSAGE_QUOTE:
      return {
        ...state,
        messageQuote: action.payload,
      };
    case typeChat.SAVE_MESSAGE_EDIT:
      return {
        ...state,
        messageEdit: action.payload,
      };
    case typeChat.RESET_DATA:
      return {
        ...state,
        detailChat: [],
        // cachedDetailChat: [],
        pagingDetail: null,
        id_messageSearch: null,
        redLineId: null,
      };
    case typeChat.RESULT_SEARCH_MESSAGE:
      return {
        ...state,
        detailChat: action.payload.data,
        pagingDetail: action.payload.paging,
      };
    case typeChat.SAVE_MESSAGE_SEARCH:
      return {
        ...state,
        id_messageSearch: action.payload,
      };
    case typeChat.GET_DETAIL_MESSAGE_SOCKET_SEEN_SUCCESS:
      //Logic xử lý phần đã xem message
      const arrayListChat = [...state.detailChat];
      let dataNew = arrayListChat?.filter(
        (item: any) => item?.id === action?.payload?.id,
      );
      let dataSeen = arrayListChat?.filter(
        (item: any) => item?.id !== action?.payload?.id,
      );
      dataSeen?.forEach((itemData: any, indexData: any) => {
        let dataUser: any = [];
        if (itemData?.users_seen?.length > 0) {
          dataUser = [...itemData?.users_seen];
          const indexUser = dataUser.findIndex(
            (element: any) => element?.id == action.payload?.userID,
          );
          if (indexUser > -1) {
            dataUser.splice(indexUser, 1);
          }
        }
        dataSeen[indexData].users_seen = dataUser;
      });
      return {
        ...state,
        detailChat: dataNew?.concat(dataSeen),
      };
    case typeChat.DETAIL_ROOM_SOCKET_SUCCESS:
      const dataList = [...state?.roomList];
      const indexListRoom = dataList.findIndex(
        (element: any) => element?.id == action.payload?.id,
      );
      if (indexListRoom > -1) {
        dataList[indexListRoom] = action.payload;
      }
      return {
        ...state,
        roomList: dataList,
      };
    case typeChat.IS_GET_INFO_ROOM:
      return {
        ...state,
        isGetInfoRoom: action.payload,
      };
    case typeChat.GET_UNREAD_MESSAGE_COUNT_ALL:
      return {
        ...state,
        GetUnreadMessageCount: action.payload,
      };
    case typeChat.GET_UNREAD_MESSAGE_COUNT_ALL_SUCCESS:
      let count = action.payload;
      return {
        ...state,
        unReadMessageCount: count,
      };
    case typeChat.SHOW_HIDE_MODAL_FILTER_LISTCHAT:
      return {
        ...state,
        modalFilterChat: action.payload,
      };
    case typeChat.SAVE_TYPE_FILTER:
      return {
        ...state,
        type_Filter: action.payload,
      };
    case typeChat.SAVE_CATEGORY_FILTER:
      return {
        ...state,
        categoryID_Filter: action.payload,
      };
    case typeChat.SAVE_STATUS_FILTER:
      return {
        ...state,
        status_Filter: action.payload,
      };
    case typeChat.LOG_MESSAGE:
      let current_room_id = action.payload?.current_room_id;
      let irregular_message_ids = action.payload?.irregular_message_ids;
      return {
        ...state,
        current_room_id: current_room_id,
        irregular_message_ids: irregular_message_ids,
      };
    case typeChat.CACHE_CHAT_MESSAGE:
      console.log('hosotanidebugaaa');
      console.log(action.payload);
      if (
        state.detailChat.some(value => value === Object.keys(action.payload)[0])
      ) {
        delete state.detailChat[Object.keys(action.payload)[0]];
      }
      return {
        ...state,
        cachedDetailChataaaaa: action.payload.concat(state.detailChat),
      };
    default:
      return state;
  }
}
