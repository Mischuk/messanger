import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../App';
import { Routes } from '../../routes';
import { socket } from '../../socket';
import { api } from '../../utils/axiosInstance';
import './Auth.styles.scss';
import { useAuth } from './useAuth';

let signInController: AbortController | null = null;
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

const useUserSession = () => {
    let navigate = useNavigate();
    const { updateStore } = useContext(StoreContext);
    const { signin } = useAuth();
    const queryClient = useQueryClient();
    const signIn = useMutation(
        'signInLabel',

        requestSignIn,
        {
            onMutate: () => {
                console.log(queryClient);
            },
            onSuccess: (data?: any) => {
                if (!data) return;
                updateStore('user', data);
                socket.emit('joinClient', data);

                signin(data.userName, () => {
                    navigate(Routes.Messanger, { replace: true });
                });
            },
            onError: () => {
                console.log('errr');
            },
        }
    );

    return { signIn };
};

const Auth = () => {
    const [error] = useState(false);
    const [user, setUser] = useState('');
    const { signIn } = useUserSession();

    const handleSignIn = () => signIn.mutate({ name: user });

    const handleChangeUsername = (e: any) => {
        setUser(e.target.value);
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };
    const search = useMutation('search', async (val) => {
        const response = await api.get(`/citySearch?name=${val}`);
        return response;
    });

    const handleSearch = (e: any) => {
        const val = e.target.value;
        if (!val) return;

        search.mutate(val);
    };

    return (
        <div className='Auth'>
            {error && <div className='Auth__error'>This name is already exist</div>}

            <div className='Auth__form'>
                {/* <input
                    type='text'
                    className='Auth__input'
                    placeholder='Your name...'
                    spellCheck={false}
                    onChange={handleChangeUsername}
                    onKeyUp={handleEnter}
                /> */}
                <input
                    type='text'
                    className='Auth__input'
                    placeholder='Your cities...'
                    spellCheck={false}
                    onChange={handleSearch}
                />
                {/* <div className='Auth__submit'>
                    <Button onClick={handleSignIn}>Ok</Button>
                </div> */}

                {signIn.isLoading && <div className='Auth__loader'>Wait for a moment...</div>}
            </div>
        </div>
    );
};

export { Auth };
