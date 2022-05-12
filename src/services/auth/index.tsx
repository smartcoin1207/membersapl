import api from '../api';

const LOGIN = 'auth/login';
const LOGOUT = 'user/logout';
const UPDATE_USER_INFO = 'user/edit-profile';
const CHANGE_PASSWORD = 'user/change-password';
const UPDATE_IMAGE_PROFILE = 'user/update-avatar';
const FORGOT_PASSWORD = 'auth/forgot-password';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const logOutApi: any = async () => {
  const response = await api.post(LOGOUT);
  return response;
};

export const updateProfile: any = async (data: any) => {
  const response = await api.post(UPDATE_USER_INFO, data);
  return response;
};

export const changePassword: any = async (data: any) => {
  const response = await api.post(CHANGE_PASSWORD, data);
  return response;
};

export const updateImageProfile: any = async (data: any) => {
  const response = await api.post(UPDATE_IMAGE_PROFILE, data);
  return response;
};

export const forgotPassword: any = async (data: any) => {
  const response = await api.post(FORGOT_PASSWORD, data);
  return response;
};
