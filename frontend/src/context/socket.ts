import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://localhost:3333');
export const SocketContext = React.createContext<{
  socket: Socket,
  users: Array<UserResponse | false>
}>({
  socket,
  users: [{
    socketID: '',
    userID: 0,
    userName: '',
  }],
});
