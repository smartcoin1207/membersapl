import {put, takeLatest, select} from 'redux-saga/effects';
import {demoActionChangeSuccess} from './action';

import {typeDemo} from './type';

export function* demoSagaAction(action: any) {
  yield put(demoActionChangeSuccess(action?.payload));
}

export function* demoSaga() {
  yield takeLatest(typeDemo.DEM0, demoSagaAction);
}
