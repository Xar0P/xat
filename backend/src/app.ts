/* eslint-disable no-param-reassign */
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';

import { Token, User } from './routes';

interface UserSocket {
  id: number,
  email: string,
  name: string,
}

const allowedOrigin = 'http://localhost:3000';

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
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('<h1>Olá</h1>');
    });
    this.app.use('/users/', User);
    this.app.use('/tokens/', Token);
  }

  sockets() {
    this.io.on('connection', (socket: Socket) => {
      socket.on('userdata', (data: UserSocket) => {
        socket.data.username = data.name;
      });

      const users = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const [id, socket] of this.io.of('/').sockets) {
        users.push({
          userID: id,
          username: socket.handshake.auth.username,
        });
      }

      socket.emit('users', users);

      socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.handshake.auth.username,
      });

      socket.on('private message', async ({ msg, to }) => {
        console.log('OI');
        const currentSocket = await this.io.in(to).fetchSockets();
        socket.to(to).emit('new private message', {
          msg,
          from: socket.id,
        });

        // socket.emit('private message', {
        //   data: currentSocket[0]?.data,
        //   msg,
        // });
      });

      socket.on('disconnect', () => {
        // eslint-disable-next-line no-console
        console.log(`the user ${socket.handshake.auth.username} has been disconnected`);
      });

      socket.on('chat message', (msg) => {
        console.log(msg);
        this.io.emit('chat message', msg);
      });
    });
  }
}

export default new App().server;
