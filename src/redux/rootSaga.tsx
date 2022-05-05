import {all, fork} from 'redux-saga/effects';
import {demoSaga} from './demo';
import {authSaga} from './auth';

function* rootSaga() {
  yield all([fork(demoSaga), fork(authSaga)]);
}

export default rootSaga;
