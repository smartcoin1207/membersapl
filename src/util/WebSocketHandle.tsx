import {io} from 'socket.io-client';
import {
  getRoomList,
  getDetailMessageSocket,
  getDetailMessageSocketCurrent,
  getDetailMessageSocketSeen,
} from '@redux';
import {store} from '../redux/store';

function createAppSocket() {
  const socket = io('https://stage-v3mbs-msg01.mem-bers.jp:443', {
    autoConnect: false,
  });

  const init = () => {
    socket.connect();
  };

  socket.on('connect', () => {});
  socket.on('new_message_ind', data => {
    const state = store.getState();
    if (data?.user_id !== state?.auth?.userInfo?.id) {
      if (data?.room_id == state?.chat?.id_roomChat) {
        store.dispatch(getDetailMessageSocket(data?.message_id));
      } else {
      }
    } else {
      store.dispatch(getDetailMessageSocketCurrent(data?.message_id));
    }
  });

  socket.on('new_message_conf', async data => {
    const state = store.getState();
    if (data?.user_id !== state?.auth?.userInfo?.id) {
      if (data?.room_id == state?.chat?.id_roomChat) {
        const body = {
          idMsg: data?.message_id,
          idUser: data?.user_id,
        };
        store.dispatch(getDetailMessageSocketSeen(body));
      } else {
      }
    } else {
    }
  });

  socket.on('disconnect', () => {});

  const endConnect = () => {
    socket.disconnect();
  };

  return {
    init,
    endConnect,
    socket,
  };
}

export const AppSocket = createAppSocket();
