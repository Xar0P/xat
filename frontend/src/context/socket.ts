import React from 'react';
import dotenv from 'dotenv';

import { io, Socket } from 'socket.io-client';

dotenv.config();
export const socket = io(process.env.BACKEND_URL);
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
