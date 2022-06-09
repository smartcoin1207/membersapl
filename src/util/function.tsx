import dayjs from 'dayjs';
import {LINK_URL_REGEX} from '@util';

export function isSameDay(currentMessage: any, diffMessage: any) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function convertArrUnique(arr: any, comp: any) {
  const unique = arr
    .map((e: any) => e[comp])
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
    .filter((e: any) => arr[e])
    .map((e: any) => arr[e]);

  return unique;
}

export const validateLink = (text: any) => {
  return LINK_URL_REGEX.test(text);
};
