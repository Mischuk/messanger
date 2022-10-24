import { useMutation } from 'react-query';
import { api } from '../../utils/axiosInstance';

type API__USER_AUTH = { id: string; name: string };

let controller: AbortController;

const auth = async (data: { name: string }): Promise<API__USER_AUTH> => {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    const response: API__USER_AUTH = await api.post('/auth/signin', data, {
        signal: controller.signal,
    });

    return response;
};

const useAuthy = () => {
    return {
        ...useMutation(auth),
        abort: () => controller.abort(),
    };
};

export { useAuthy };
