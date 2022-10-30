import { getCurrentTime } from '@utils/helpers';

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
