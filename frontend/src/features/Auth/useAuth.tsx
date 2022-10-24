import { useMutation } from 'react-query';
import { API__USER_AUTH } from '../../models/api';
import { api } from '../../utils/axiosInstance';
import { abortController } from '../../utils/cancelableRequest';

let controller: AbortController;

const auth = async (data: { name: string }): Promise<API__USER_AUTH> => {
    controller = abortController(controller);

    const { data: response } = await api.post<API__USER_AUTH>(
        '/auth/signin',
        data,
        {
            signal: controller.signal,
        }
    );

    return response;
};

const useAuth = () => {
    return {
        ...useMutation(auth),
        abort: () => controller.abort(),
    };
};

export { useAuth };
