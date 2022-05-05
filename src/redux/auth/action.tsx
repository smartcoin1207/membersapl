import {typeAuth} from './type';

export const login = (payload: any) => ({
  type: typeAuth.LOGIN,
  payload,
});

export const logOut = () => ({
  type: typeAuth.LOGOUT,
});

export const saveToken = (payload: any) => ({
  type: typeAuth.SAVE_TOKEN,
  payload,
});
