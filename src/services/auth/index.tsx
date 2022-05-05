import api from '../api';

const LOGIN = 'auth/login';
const LOGOUT = 'user/logout';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const logOutApi: any = async () => {
  const response = await api.post(LOGOUT);
  return response;
};
