const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://127.0.0.1:3000', 'http://192.168.101.103:3000'],
        methods: ['GET', 'POST'],
    },
});

const { updateFile, readFile } = require('./core/fs');

const { PORT } = require('./core/constants');

app.use(express.json({ extended: true }));
app.use(cors());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/messages', require('./routes/messages.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

async function start() {
    try {
        server.listen(PORT, () => {
            console.log('Server listening at port %d', PORT);
        });

        const clients = [];

        io.on('connection', (socket) => {
            console.log('connection', socket.id);

            socket.on('joinClient', async (data) => {
                const newUser = { name: data.userName, id: socket.id };
                if (!clients.find(({ name }) => name === data.userName)) {
                    clients.push(newUser);
                }

                // io.emit('joinServer', { clients });
            });

            socket.on('sendMessage', async (data) => {
                const { newMessage } = data;
                const filedata = await readFile('messages.json');
                filedata.data.messages.push(newMessage);
                await updateFile('messages.json', filedata);
                io.emit('newMessageFromServer', data);
            });

            socket.on('leaveClient', async () => {
                const idx = clients.findIndex((el) => el.id === socket.id);
                clients.splice(idx, 1);
                socket.broadcast.emit('leaveServer', { clients });
            });

            socket.on('disconnect', async () => {
                console.log('disconnect', socket.id);
                const idx = clients.findIndex((el) => el.id === socket.id);

                if (idx >= 0) {
                    clients.splice(idx, 1);
                    socket.broadcast.emit('leaveServer', { clients });
                }
            });
        });
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();
