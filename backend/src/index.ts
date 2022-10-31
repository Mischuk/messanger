import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ioServerOptions } from './configs/options';
import { WS } from './enums/ws.events';
import errorMiddlewave from './middlewares/error';
import { ServerClient } from './models/serverClient';
import newRouteAuth from './routes/auth';
import RouteAuth from './routes/auth.routes';
import RouteMessage from './routes/messages.routes';
import { PORT } from './utils/constants';
import { updateFile } from './utils/fs';

dotenv.config();

const msgs = require('./data/messages.json');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, ioServerOptions);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', RouteAuth);
app.use('/api/messages', RouteMessage);
app.use('/api', newRouteAuth);

app.use(errorMiddlewave); // require last in chain

async function start() {
    try {
        const clients: ServerClient[] = [];

        httpServer.listen(PORT);

        // TODO: encaplusate ws logic to a separated files
        io.on(WS.CONNECTION, (socket) => {
            socket.on(WS.FC_CLIENT_CONNECT, async ({ userName }: any) => {
                const user = clients.find(({ name }) => name === userName);
                if (!user) {
                    clients.push({
                        name: userName,
                        id: socket.id,
                    });
                }
                io.emit(WS.FS_CLIENT_CONNECT, { clients });
            });

            socket.on(WS.FC_NEW_MESSAGE, async (data: any) => {
                const FILENAME_MESSAGES = 'messages.json';
                const messages: any = [...msgs.data.messages];
                messages.push(data.newMessage);
                await updateFile(FILENAME_MESSAGES, messages);
                io.emit(WS.FS_NEW_MESSAGE, data);
            });

            socket.on(WS.DISCONNECT, async () => {
                const idx = clients.findIndex((el) => el.id === socket.id);

                if (idx >= 0) {
                    clients.splice(idx, 1);
                    socket.broadcast.emit(WS.FS_CLIENT_DISCONNECT, { clients });
                }
            });
        });
    } catch (e) {
        console.log('Server error');
        process.exit(1);
    }
}

start();
