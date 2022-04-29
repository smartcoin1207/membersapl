import {typeDemo} from './type';
import {INITIAL_STATE_DEMO} from './state';

export default function demoReducer(state = INITIAL_STATE_DEMO, action: any) {
  switch (action.type) {
    case typeDemo.DEMO_SUCCESS:
      return {
        ...state,
        number: action.payload,
      };
    default:
      return state;
  }
}
