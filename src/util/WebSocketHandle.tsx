import {io} from 'socket.io-client';
const socket = io('https://3.113.64.12/');

function createAppSocket() {
  // var ws = new WebSocket('https://3.113.64.12/');
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
    setTimeout(() => {
      console.log('Hello', socket)
    }, 4000)
    // socket.on('disconnect', () => {
    //   console.log(socket.id); // undefined
    // });
  };

  const endConnect = () => {
    // ws.onclose = e => {
    //   console.log('DISCONNECT', e);
    // };
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
