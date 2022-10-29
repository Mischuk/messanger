import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { WS } from './enums/ws.events';
import RouteAuth from './routes/auth.routes';
import RouteMessage from './routes/messages.routes';
import { PORT } from './utils/constants';
import { readFile, updateFile } from './utils/fs';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.101.103:3000'],
        methods: ['GET', 'POST'],
    },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', RouteAuth);
app.use('/api/messages', RouteMessage);

const FILENAME_MESSAGES = 'messages.json';

async function start() {
    try {
        const clients: any[] = [];

        httpServer.listen(PORT);

        io.on(WS.CONNECTION, (socket) => {
            socket.on(WS.FC_CLIENT_CONNECT, async ({ userName }: any) => {
                const isUserConnected = clients.find(
                    ({ name }) => name === userName
                );

                if (!isUserConnected) {
                    clients.push({
                        name: userName,
                        id: socket.id,
                    });
                }

                io.emit(WS.FS_CLIENT_CONNECT, { clients });
            });

            socket.on(WS.FC_NEW_MESSAGE, async (data: any) => {
                const messages: any = await readFile(FILENAME_MESSAGES);
                messages.data.messages.push(data.newMessage);
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
