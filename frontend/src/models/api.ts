export interface API__USER_AUTH {
    userName: string;
    userId: string;
}

export interface API__MESSAGES {
    data: {
        messages: {
            author: string;
            message: string;
            time: string;
        }[];
    };
}
