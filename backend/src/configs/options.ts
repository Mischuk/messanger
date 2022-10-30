import { ServerOptions } from 'socket.io';

const ioServerOptions: Partial<ServerOptions> = {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.101.103:3000'],
        methods: ['GET', 'POST'],
    },
};

export { ioServerOptions };
