import {put, takeLatest, select} from 'redux-saga/effects';
import {getRoomListSuccess, getDetailListChatSuccess} from './action';

import {typeChat} from './type';
import {getRoomListApi, getDetailChatApi} from '@services';

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
    };
    const result: ResponseGenerator = yield getDetailChatApi(param);
    yield put(getDetailListChatSuccess(result?.data));
  } catch (error) {
  } finally {
  }
}

export function* chatSaga() {
  yield takeLatest(typeChat.GET_ROOM_LIST, getRoomListSaga);
  yield takeLatest(typeChat.GET_DETAIL_LIST_CHAT, getDetailChatSaga);
}
