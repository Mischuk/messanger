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
