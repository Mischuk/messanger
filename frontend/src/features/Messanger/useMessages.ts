import { api } from '@api';
import { API__MESSAGE } from '@models/api';
import { iMessage } from '@models/message';
import { abortController } from '@utils/cancelableRequest';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

let controller: AbortController;

const getMessages = async (): Promise<iMessage[]> => {
    controller = abortController(controller);

    const response = await api.get<API__MESSAGE[]>('/messages');
    return response.data;
};

const useMessages = () => {
    const query = useQuery(['getMessages'], getMessages);
    const [messages, setMessages] = useState<iMessage[]>([]);

    const addMessages = useCallback(
        (data: iMessage[]) => setMessages((prev) => [...prev, ...data]),
        []
    );

    useEffect(() => {
        if (query.data) {
            setMessages(query.data);
        }
    }, [query.data]);

    return {
        ...query,
        data: messages,
        addMessages,
        abort: () => controller.abort(),
    };
};

export { useMessages };
