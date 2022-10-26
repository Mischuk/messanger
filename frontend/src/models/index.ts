import { getCurrentTime } from '../utils/helpers';
import { API__USER_AUTH } from './api';

export interface iUser {
    userName: string;
    userId: string;
}

export class User implements iUser {
    static initialData = {
        userName: '',
        userId: '',
    };

    userName = User.initialData.userName;
    userId = User.initialData.userId;

    constructor(data?: API__USER_AUTH) {
        if (data) {
            const { userId, userName } = User.initialData;

            this.userId = data.userId || userId;
            this.userName = data.userName || userName;
        }
    }
}

export interface iMessage {
    author: string;
    time: string;
    message: string;
}

export class Message implements iMessage {
    static initialData = {
        author: '',
        time: '',
        message: '',
    };

    author = Message.initialData.author;
    time = Message.initialData.time;
    message = Message.initialData.message;

    constructor(data?: Omit<iMessage, 'time'>) {
        if (data) {
            const { author, time, message } = Message.initialData;

            this.author = data.author || author;
            this.time = this.getTime() || time;
            this.message = data.message || message;
        }
    }

    private getTime() {
        return getCurrentTime();
    }
}
