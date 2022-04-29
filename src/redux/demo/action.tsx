import {typeDemo} from './type';

export const demoActionChange = (payload: any) => ({
  type: typeDemo.DEM0,
  payload,
});

export const demoActionChangeSuccess = (payload: any) => ({
  type: typeDemo.DEMO_SUCCESS,
  payload,
});
