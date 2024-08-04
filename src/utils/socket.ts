import { io, Socket } from 'socket.io-client';

const setupSocket = (): Socket => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }
  console.log(token);

  const socket: Socket = io('http://147.45.235.143:3000', {
    auth: {
      token: `${token}`,
    },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
  });

  socket.on('connect_error', (error: any) => {
    console.error('WebSocket Error:', error);
  });

  return socket;
};

export default setupSocket;
