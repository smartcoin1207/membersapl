import {io} from 'socket.io-client';
import {store} from '../redux/store';
const socket = io('https://stage-v3mbs-msg01.mem-bers.jp:443');

const link1 = 'https://stage-v3mbs-msg01.mem-bers.jp:443/socket.io';
const link2 = 'ws://stage-v3mbs-msg01.mem-bers.jp/socket.io';
const link3 = 'ws://3.113.64.12/socket.io';

function createAppSocket() {
  var ws = new WebSocket(link1);
  const state = store.getState();
  console.log(state);
  const init = () => {
    // ws.onopen = () => {
    //   console.log('CONNECTED_WEB_SOCKET');
    // };
    // ws.onerror = e => {
    //   handleError(e);
    // };
    // ws.onmessage = e => {
    //   handleOnMessage(e);
    // };
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

  const endConnect = () => {
    ws.onclose = e => {
      console.log('DISCONNECT', e);
    };
  };

  const handleError = (e: any) => {
    console.log('ERROR_WEB_SOCKET', e);
  };

  const handleOnMessage = (e: any) => {
    console.log('ON_MESSAGE_WEB_SOCKET', e);
  };

  return {
    init,
    endConnect,
  };
}

export const AppSocket = createAppSocket();
