import { useMutation } from 'react-query';
import { api } from '../../../api/instances';
import { API__USER_AUTH } from '../../../models/api';
import { abortController } from '../../../utils/cancelableRequest';
import { FieldsError } from '../../../utils/enum';
import { ErrorResponse } from '../../../utils/types';

let controller: AbortController;

type AuthArgs = { name: string };

const auth = async (data: AuthArgs): Promise<API__USER_AUTH> => {
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

const useAuthQuery = () => {
    return {
        ...useMutation<
            API__USER_AUTH,
            ErrorResponse<FieldsError.Name | FieldsError.Password>,
            AuthArgs
        >(auth),
        abort: () => controller.abort(),
    };
};

export { useAuthQuery };
