export type ChatState = {
  roomList: any;
  detailChat: any;
  pagingDetail: any;
  idCompany: any;
};

export const INITIAL_STATE_CHAT: ChatState = {
  roomList: null,
  detailChat: null,
  idCompany: null,
  pagingDetail: null,
};
