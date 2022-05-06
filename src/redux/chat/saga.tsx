import {put, takeLatest, select} from 'redux-saga/effects';
import {getRoomListSuccess} from './action';

import {typeChat} from './type';
import {getRoomListApi} from '@services';

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

export function* chatSaga() {
  yield takeLatest(typeChat.GET_ROOM_LIST, getRoomListSaga);
}
