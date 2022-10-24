import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Message } from '../../models';
import { API__MESSAGES } from '../../models/api';
import { api } from '../../utils/axiosInstance';
import { abortController } from '../../utils/cancelableRequest';

let controller: AbortController;

const getMessages = async (): Promise<Message[]> => {
    controller = abortController(controller);

    const { data: response } = await api.get<API__MESSAGES>('/messages', {
        signal: controller.signal,
    });

    return response.data.messages;
};

const useMessages = () => {
    const query = useQuery('getMessages', getMessages, {
        initialData: [] as Message[],
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const addMessages = (data: Message[]) =>
        setMessages((prev) => [...prev, ...data]);
    useEffect(() => {
        if (query.data) {
            setMessages(query.data);
        }
    }, [query.data]);

    return useMemo(
        () => ({
            ...query,
            data: messages,
            addMessages,
            abort: () => controller.abort(),
        }),
        [messages, query]
    );
};

export { useMessages };
