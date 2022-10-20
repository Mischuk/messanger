import { io } from 'socket.io-client';
const socket = io('http://192.168.101.103:8000');
export { socket };
