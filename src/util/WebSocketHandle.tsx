import {io} from 'socket.io-client';
import {store} from '../redux/store';

function createAppSocket() {
  const socket = io('https://stage-v3mbs-msg01.mem-bers.jp:443');
  const state = store.getState();

  const init = () => {
    socket.on('connect', () => {
      console.log('Connected');
      socket.on('message_ind', data => {
        console.log('message_ind', data);
      });
      socket.on('new_message_ind', data => {
        console.log('new_message_ind', data);
      });
    });
    
  };

  const endConnect = () => {};

  return {
    init,
    endConnect,
    socket,
  };
}

export const AppSocket = createAppSocket();
