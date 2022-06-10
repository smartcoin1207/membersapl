import {io} from 'socket.io-client';
import {
  getRoomList,
  getDetailMessageSocket,
  getDetailMessageSocketCurrent,
} from '@redux';
import {store} from '../redux/store';

function createAppSocket() {
  const socket = io('https://stage-v3mbs-msg01.mem-bers.jp:443', {
    autoConnect: false,
  });

  const init = () => {
    socket.connect();
  };

  socket.on('connect', () => {
    console.log('CONNECTED');
  });
  socket.on('new_message_ind', data => {
    console.log('new_message_ind', data)
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

  socket.on('new_message_conf', data => {
    console.log('new_message_conf', data);
    const state = store.getState();
    // if (data?.user_id !== state?.auth?.userInfo?.id) {
    //   if (data?.room_id == state?.chat?.id_roomChat) {
    //     store.dispatch(getDetailMessageSocket(data?.message_id));
    //   } else {
    //   }
    // } else {
    //   store.dispatch(getDetailMessageSocketCurrent(data?.message_id));
    // }
  });

  socket.on('connect_room_join_req', data => {
    console.log('connect_room_join_req', data);
    const state = store.getState();
    // if (data?.user_id !== state?.auth?.userInfo?.id) {
    //   if (data?.room_id == state?.chat?.id_roomChat) {
    //     store.dispatch(getDetailMessageSocket(data?.message_id));
    //   } else {
    //   }
    // } else {
    //   store.dispatch(getDetailMessageSocketCurrent(data?.message_id));
    // }
  });

  socket.on('disconnect', () => {
    console.log('DISCONNECTED');
  });

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
