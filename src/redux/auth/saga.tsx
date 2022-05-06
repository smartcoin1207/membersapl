import {put, takeLatest, select} from 'redux-saga/effects';

import {saveToken} from './action';
import {typeAuth} from './type';
import {GlobalService, loginApi, logOutApi} from '@services';

interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action?.payload);
    yield put(saveToken(result?.data?.token));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* logOutSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield logOutApi();
    yield put(saveToken(null));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* authSaga() {
  yield takeLatest(typeAuth.LOGIN, loginSaga);
  yield takeLatest(typeAuth.LOGOUT, logOutSaga);
}
