"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const axios_1 = __importDefault(require("axios"));
const routes_1 = require("./routes");
const allowedOrigin = 'http://localhost:3000';
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: allowedOrigin,
            },
        });
        this.middlewares();
        this.routes();
        this.sockets();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: allowedOrigin }));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/users/', routes_1.User);
        this.app.use('/tokens/', routes_1.Token);
        this.app.use('/messages/', routes_1.Message);
    }
    sockets() {
        let users = [];
        this.io.on('connection', (socket) => {
            const addUser = ({ userID, socketID, userName, }) => (!users.some((user) => user.userID === userID)
                && users.push({ userID, socketID, userName }));
            const removeUser = (socketID) => {
                users = users.filter((user) => user.socketID !== socketID);
            };
            socket.on('addUser', (data) => {
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
            const reloadMessages = async ({ userID, friendID, }, to = '') => {
                const data = await axios_1.default.get('http://localhost:3333/messages/', {
                    data: {
                        userID,
                        friendID,
                    },
                });
                const messages = data.data.data;
                if (to) {
                    this.io.to(to).emit('newPrivateMessage', { messages, friendID });
                    socket.emit('newPrivateMessage', { messages, friendID });
                }
                else {
                    socket.emit('reloadMessages', { messages, friendID });
                }
            };
            socket.on('reloadMessages', ({ userID, friendID }) => {
                reloadMessages({ userID, friendID });
            });
            socket.on('newPrivateMessage', async ({ msg, to }) => {
                const currentSocket = await this.io.in(to).fetchSockets();
                const { userID } = currentSocket[0].data;
                await axios_1.default.post('http://localhost:3333/messages/', {
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
exports.default = new App().server;
//# sourceMappingURL=app.js.map