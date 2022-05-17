import {defaultAvatar} from '@images';
import moment from 'moment';
import React, {useMemo} from 'react';

export const useFunction = (props: any) => {
  const dataTest = [
    {
      _id: 110,
      text: 'Nice to meet you',
      createdAt: moment().toDate(),
      user: {
        _id: 2,
        avatar:
          'https://member-chat-api.adamo.tech/storage/member/200/15073d1d-bdc0-4c76-92a8-f3c0ec5b1bc2/icon_image.JPG',
      },
    },
    {
      _id: 111,
      text: "Yes, i'm good",
      createdAt: moment().toDate(),
      user: {
        _id: 2,
        avatar:
          'https://member-chat-api.adamo.tech/storage/member/200/15073d1d-bdc0-4c76-92a8-f3c0ec5b1bc2/icon_image.JPG',
      },
    },
    {
      _id: 112,
      text: 'Hello David',
      createdAt: moment().toDate(),
      user: {
        _id: 1,
        avatar:
          'https://member-chat-api.adamo.tech/storage/member/200/15073d1d-bdc0-4c76-92a8-f3c0ec5b1bc2/icon_image.JPG',
      },
    },
    {
      _id: 113,
      text: "Hello, I'm David, how are you?",
      createdAt: moment().toDate(),
      user: {
        _id: 2,
        avatar:
          'https://member-chat-api.adamo.tech/storage/member/200/15073d1d-bdc0-4c76-92a8-f3c0ec5b1bc2/icon_image.JPG',
      },
    },
  ];

  const chatUser = useMemo(() => {
    return {
      _id: 2,
    };
  }, []);

  return {dataTest, chatUser};
};
