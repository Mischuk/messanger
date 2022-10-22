import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../App';
import { Button } from '../../components/Button/Button';
import { Routes } from '../../routes';
import { socket } from '../../socket';
import { api } from '../../utils/axiosInstance';
import { AbortControl } from '../../utils/types';
import './Auth.styles.scss';
import { useAuthContext } from './useAuthContext';

let signInController: AbortControl = null;

// let abortableControllerInstance: AbortControl = null;
// const abortableRequest = (fn: Function) => {
//     if (abortableControllerInstance) {
//         abortableControllerInstance.abort();
//     }
//     abortableControllerInstance = new AbortController();
//     return function (this: any, ...args: any[]) {
//         setTimeout(
//             () => fn.apply(this, [...args, abortableControllerInstance]),
//             0
//         );
//     };
// };

const requestSignIn = async (data: { name: string }) => {
    if (signInController) {
        signInController.abort();
    }

    signInController = new AbortController();
    try {
        const { data: response } = await api.post('/auth/signin', data, {
            signal: signInController.signal,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

const useAuth = () => {
    let navigate = useNavigate();
    const { updateStore } = useContext(StoreContext);
    const { signin } = useAuthContext();
    const signIn = useMutation(
        'signInLabel',

        requestSignIn,
        {
            onSuccess: (data?: any) => {
                if (!data) return;
                updateStore('user', data);
                socket.emit('joinClient', data);

                signin(data.userName, () => {
                    navigate(Routes.Messanger, { replace: true });
                });
            },
        }
    );

    return { signIn };
};

const Auth = () => {
    const [error] = useState(false);
    const [user, setUser] = useState('');
    const { signIn } = useAuth();

    const handleSignIn = () => signIn.mutate({ name: user });

    const handleChangeUsername = (e: any) => {
        setUser(e.target.value);
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };

    const closeRequest = () => {
        if (signInController) {
            signInController.abort();
            signIn.reset();
        }
    };

    return (
        <div className='Auth'>
            {error && (
                <div className='Auth__error'>This name is already exist</div>
            )}

            <div className='Auth__form'>
                <input
                    type='text'
                    className='Auth__input'
                    placeholder='Your name...'
                    spellCheck={false}
                    onChange={handleChangeUsername}
                    onKeyUp={handleEnter}
                />

                <div className='Auth__submit'>
                    <Button onClick={handleSignIn}>Ok</Button>
                </div>

                {signIn.isLoading && (
                    <div className='Auth__loader' onClick={closeRequest}>
                        Wait for a moment...
                    </div>
                )}
            </div>
        </div>
    );
};

export { Auth };
