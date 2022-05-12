import {defaultAvatar} from '@images';
import moment from 'moment';

export const useFunction = (props: any) => {
  const dataTest = [
    {
      _id: 110,
      text: "Hello, I'm David, how are you?",
      createdAt: moment().toDate(),
      user: {
        _id: 1,
        avatar:
          'https://member-chat-api.adamo.tech/storage/member/200/15073d1d-bdc0-4c76-92a8-f3c0ec5b1bc2/icon_image.JPG',
      },
    },
    {
      _id: 111,
      text: 'Hello David',
      createdAt: moment().toDate(),
      user: {
        _id: 2,
        avatar:
          'https://member-chat-api.adamo.tech/storage/member/200/15073d1d-bdc0-4c76-92a8-f3c0ec5b1bc2/icon_image.JPG',
      },
    },
  ];

  return {dataTest};
};
