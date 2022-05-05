import {typeAuth} from './type';
import {INITIAL_STATE_AUTH} from './state';

export default function authReducer(state = INITIAL_STATE_AUTH, action: any) {
  switch (action.type) {
    case typeAuth.SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
