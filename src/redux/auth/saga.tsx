import {put, takeLatest, select} from 'redux-saga/effects';

import {saveToken, saveInfoUser} from './action';
import {typeAuth} from './type';
import {GlobalService, loginApi, logOutApi, getUserInfoApi} from '@services';

interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action?.payload);
    yield put(saveInfoUser(result?.data?.user_info));
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

export function* getUserInfoSaga(action: any) {
  try {
    const result: ResponseGenerator = yield getUserInfoApi(action?.payload);
    yield put(saveInfoUser(result?.data?.user));
  } catch (error) {
  } finally {
  }
}

export function* authSaga() {
  yield takeLatest(typeAuth.LOGIN, loginSaga);
  yield takeLatest(typeAuth.LOGOUT, logOutSaga);
  yield takeLatest(typeAuth.GET_USER_INFO, getUserInfoSaga)
}
