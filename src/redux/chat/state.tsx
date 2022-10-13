export type ChatState = {
  roomList: any;
  pagingListRoom: any;
  detailChat: any;
  pagingDetail: any;
  idCompany: any;
  message_pinned: any;
  id_roomChat: any;
  messageReply: any;
  messageEdit: any;
  id_messageSearch: any;
  isGetInfoRoom: boolean;
};

export const INITIAL_STATE_CHAT: ChatState = {
  roomList: null,
  detailChat: null,
  idCompany: null,
  pagingDetail: null,
  message_pinned: null,
  id_roomChat: null,
  messageReply: null,
  messageEdit: null,
  pagingListRoom: null,
  id_messageSearch: null,
  isGetInfoRoom: false,
};
