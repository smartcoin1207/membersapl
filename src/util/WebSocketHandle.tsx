import {io} from 'socket.io-client';
import {store} from '../redux/store';

function createAppSocket() {
  const socket = io('https://stage-v3mbs-msg01.mem-bers.jp:443');
  const state = store.getState();
  const init = () => {
    console.log();
    socket.on('connect', () => {
      console.log('Connected');
    });
    socket.on('new_message_ind', data => {
      console.log('new_message_ind', data);
    });
    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });
  };

  const endConnect = () => {};

  return {
    init,
    endConnect,
  };
}

export const AppSocket = createAppSocket();
