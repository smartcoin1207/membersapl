import {combineReducers} from 'redux';

import demo from './demo/reducer';
import auth from './auth/reducer';
import chat from './chat/reducer';

const appReducer = combineReducers({
  demo,
  auth,
  chat,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
