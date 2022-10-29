const express = require('express');
// const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const WS = require('./core/ws.events');
const { updateFile, readFile } = require('./core/fs');
const { PORT } = require('./core/constants');
const FILENAME_MESSAGES = 'messages.json';

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.101.103:3000'],
        methods: ['GET', 'POST'],
    },
});

app.use(express.json({ extended: true }));
app.use(cors());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/messages', require('./routes/messages.routes'));

async function start() {
    try {
        const clients = [];

        server.listen(PORT);

        io.on(WS.CONNECTION, (socket) => {
            socket.on(WS.FC_CLIENT_CONNECT, async ({ userName }) => {
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

            socket.on(WS.FC_NEW_MESSAGE, async (data) => {
                const messages = await readFile(FILENAME_MESSAGES);
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
        console.log('Server error', e.message);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

start();
