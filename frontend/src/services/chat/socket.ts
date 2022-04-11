import { io } from 'socket.io-client';

interface User {
  id: number,
  email: string,
  name: string,
}

export const newSocket = (user: User) => {
  const socket = io('http://localhost:3333', { autoConnect: false });
  socket.auth = { username: user.name };
  socket.connect();

  return socket;
};
