/* eslint-disable no-param-reassign */
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';
import axios from 'axios';

import { Token, User, Message as MessageRoutes } from './routes';
import { Message, UserSocket } from './module';

require('dotenv').config();

const allowedOrigin = process.env.ALLOWED_URL;

class App {
  private readonly app: express.Express;

  private readonly io: Server;

  public readonly server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: allowedOrigin,
      },
    });

    this.middlewares();
    this.routes();
    this.sockets();
  }

  middlewares() {
    this.app.use(cors({ origin: allowedOrigin }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', User);
    this.app.use('/tokens/', Token);
    this.app.use('/messages/', MessageRoutes);
  }

  sockets() {
    let users: { userID: number; socketID: string; userName: string; }[] = [];

    this.io.on('connection', (socket: Socket) => {
      const addUser = ({
        userID,
        socketID,
        userName,
      }:
        {
           userID: number;
           socketID: string;
           userName: string;
          }) => (
        !users.some((user) => user.userID === userID)
          && users.push({ userID, socketID, userName }));

      const removeUser = (socketID: string) => {
        users = users.filter((user) => user.socketID !== socketID);
      };

      socket.on('addUser', (data: UserSocket) => {
        addUser({ userID: data.id, socketID: socket.id, userName: data.name });
        socket.data = {
          userID: data.id,
          socketID: socket.id,
          userName: data.name,
        };
        this.io.emit('getUsers', users);
      });

      socket.on('disconnect', () => {
        removeUser(socket.id);
        this.io.emit('getUsers', users);
      });

      const reloadMessages = async ({
        userID,
        friendID,
      }: {
        userID: number,
        friendID: number
      }, to = '') => {
        const data = await axios.get(`${process.env.BACKEND_URL}/messages/`, {
          data: {
            userID,
            friendID,
          },
        });

        const messages = data.data.data;
        if (to) {
          this.io.to(to).emit('newPrivateMessage', { messages, friendID });
          socket.emit('newPrivateMessage', { messages, friendID });
        } else {
          socket.emit('reloadMessages', { messages, friendID });
        }
      };

      socket.on('reloadMessages', ({ userID, friendID }) => {
        reloadMessages({ userID, friendID });
      });

      socket.on('newPrivateMessage', async ({ msg, to }: {
        msg: Pick<Message, Exclude<keyof Message, 'receiver'>>,
        to: string
      }) => {
        const currentSocket = await this.io.in(to).fetchSockets();
        const { userID } = currentSocket[0].data;

        await axios.post(`${process.env.BACKEND_URL}/messages/`, {
          id: msg.id,
          message: msg.message,
          senderID: msg.senderID,
          date: msg.date,
          receiver: userID,
        });

        reloadMessages({ userID, friendID: msg.senderID }, to);
      });
    });
  }
}

export default new App().server;
