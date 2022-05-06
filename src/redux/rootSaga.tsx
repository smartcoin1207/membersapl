import {all, fork} from 'redux-saga/effects';

import {demoSaga} from './demo';
import {authSaga} from './auth';
import {chatSaga} from './chat';

function* rootSaga() {
  yield all([fork(demoSaga), fork(authSaga), fork(chatSaga)]);
}

export default rootSaga;
