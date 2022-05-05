import {combineReducers} from 'redux';

import demo from './demo/reducer';
import auth from './auth/reducer';

const appReducer = combineReducers({
  demo,
  auth,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
