import {combineReducers} from 'redux';

import demo from './demo/reducer';

const appReducer = combineReducers({
  demo,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
