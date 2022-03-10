import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';

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
    this.app.use(cors({
      origin: allowedOrigin,
    }));
  }

  routes() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('<h1>Olá</h1>');
    });
  }

  sockets() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`a user connected in ${socket.id}`);
    });
  }
}

export default new App().server;
