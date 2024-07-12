// 本番向け
// export const API_DOMAIN = 'mem-bers.jp';
// export const SOCKETIO_DOMAIN = 'v3mbs-msg01.mem-bers.jp';

// STG向け
export const API_DOMAIN = 'stage.mem-bers.jp';
export const SOCKETIO_DOMAIN = 'stage-v3mbs-msg01.mem-bers.jp';

export const HITSLOP = {top: 20, left: 20, right: 20, bottom: 20};
export const LINK_URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const EVENT_SOCKET = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  //イベント受信メッセージ（すべてのルームを聞くことができます）
  NEW_MESSAGE_IND: 'new_message_ind',
  //リアルタイム表示メッセージのイベント
  NEW_MESSAGE_CONF: 'new_message_conf',
  //チャットリスト外のリアルタイムイベント（名前変更、未読メッセージの更新、ルーム情報の変更...）
  CHAT_GROUP_UPDATE_IND: 'ChatGroup_update_ind',
  //イベント受信メッセージ (ルームに参加したときにのみ聞こえます)
  MESSAGE_IND: 'message_ind',
  //webで詳細画面を開いた場合、メッセージの既読数変化の際に送られてくる
  CHANGE_BROWSER_ICON: 'change_browser_icon',
};

export const ATTACHMENT_FILE_TYPE = {
  IMAGE: 4,
  MOVIE: 8,
  PDF: 2,
  DOC: 5,
  XLS: 3,
};

export const MESSAGE_RANGE_TYPE = {
  USER: 1, // ユーザID（複数）
  GROUP: 2, // グループID（複数）
  ALL: 3, // ALL
};

export const WEBSOCKET_METHOD_TYPE = {
  CHAT_ROOM_ADD: 1,
  CHAT_ROOM_EDIT: 2,
  CHAT_ROOM_DELETE: 3,
  CHAT_ROOM_MEMBER_ADD: 11,
  CHAT_ROOM_MEMBER_DELETE: 12,
  CHAT_ROOM_MEMBER_EDIT: 13,
};

export const NON_NUMBER_REGEX = /^[^0-9０-９]+$/;

const PROTOCOL_REGEX = 'h?ttps?:\\/\\/';

const USER_INFO_REGEX =
  "((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:)*@)?";

const IP4_REGEX =
  '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

const IP6_REGEX =
  '\\[?(?:(?:[a-f\\d]{1,4}:){7}(?:[a-f\\d]{1,4}|:)|(?:[a-f\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-f\\d]{1,4}|:)|(?:[a-f\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-f\\d]{1,4}){1,2}|:)|(?:[a-f\\d]{1,4}:){4}(?:(?::[a-f\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-f\\d]{1,4}){1,3}|:)|(?:[a-f\\d]{1,4}:){3}(?:(?::[a-f\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-f\\d]{1,4}){1,4}|:)|(?:[a-f\\d]{1,4}:){2}(?:(?::[a-f\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-f\\d]{1,4}){1,5}|:)|(?:[a-f\\d]{1,4}:){1}(?:(?::[a-f\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-f\\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-f\\d]{1,4}){1,7}|:)))(?:%[0-9a-z]{1,})?\\]?';

const DOMAIN_REGEX =
  '(?:(?:xn--[a-z\\d]+(?:-[a-z\\d]+)*|[a-z\\u00a1-\\uffff\\d]+(?:-[a-z\\u00a1-\\uffff\\d]+)*)(?:\\.[a-z\\u00a1-\\uffff\\d]+(?:-[a-z\\u00a1-\\uffff\\d]+)*)*(?:\\.[a-z\\u00a1-\\uffff]{1,}))';

const PORT_REGEX = '(:\\d*)?)';

const PATH_REGEX =
  "(/((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?";

const QUERY_REGEX =
  "(\\?((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)|[\\uE000-\\uF8FF]|\\/|\\?)*)?";

const FRAGMENT_REGEX =
  "(#((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)|\\/|\\?)*)?";

const URL_REGEX_STRING = `((${PROTOCOL_REGEX}(${USER_INFO_REGEX}(${IP4_REGEX}|${IP6_REGEX}|localhost|${DOMAIN_REGEX})${PORT_REGEX}${PATH_REGEX}${QUERY_REGEX}${FRAGMENT_REGEX}))`;

export const REGEXP_URL = new RegExp(URL_REGEX_STRING, 'gi');

export const REGEXP_EMAIL =
  /(\/|:)?(?=[a-z0-9-_])((?!.*\.\.)[a-z0-9_+\-.]{1,63}[a-z0-9_+-])@([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}/gi;
