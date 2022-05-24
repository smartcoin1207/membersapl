import {put, takeLatest, select, takeEvery, call} from 'redux-saga/effects';
import {
  getRoomListSuccess,
  getDetailListChatSuccess,
  getDetailMessageSocketSuccess,
} from './action';

import {typeChat} from './type';
import {
  getRoomListApi,
  getDetailChatApi,
  getMessageFromSocket,
} from '@services';

interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* getRoomListSaga(action: any) {
  try {
    const result: ResponseGenerator = yield getRoomListApi(action?.payload);
    yield put(getRoomListSuccess(result?.data?.rooms));
  } catch (error) {
  } finally {
  }
}

export function* getDetailChatSaga(action: any) {
  try {
    const param = {
      id: action?.payload.id,
      page: action?.payload.page,
    };
    const result: ResponseGenerator = yield getDetailChatApi(param);
    yield put(getDetailListChatSuccess(result?.data));
  } catch (error) {
  } finally {
  }
}

export function* getDetailMessageSaga(action: any) {
  try {
    const body = {
      message_id: action.payload,
    };
    const result: ResponseGenerator = yield getMessageFromSocket(body);
    yield put(getDetailMessageSocketSuccess([result?.data?.message]));
  } catch (error) {
  } finally {
  }
}

export function* chatSaga() {
  yield takeEvery(typeChat.GET_ROOM_LIST, getRoomListSaga);
  yield takeEvery(typeChat.GET_DETAIL_LIST_CHAT, getDetailChatSaga);
  yield takeEvery(typeChat.GET_DETAIL_MESSAGE_SOCKET, getDetailMessageSaga);
}
