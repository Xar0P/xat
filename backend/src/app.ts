import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';

import { Token, User } from './routes';

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
      // eslint-disable-next-line no-console
      console.log(`a user connected in ${socket.handshake.auth.username}`);
    });
  }
}

export default new App().server;
