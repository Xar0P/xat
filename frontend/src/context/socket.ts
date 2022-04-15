import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3333');
export const SocketContext = React.createContext<any>({});
