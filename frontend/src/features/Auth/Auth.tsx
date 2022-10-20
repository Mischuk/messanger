import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../App';
import { Button } from '../../components/Button/Button';
import { useHttp } from '../../hooks/useHttp';
import { Routes } from '../../routes';
import { socket } from '../../socket';
import './Auth.styles.scss';
import { useAuth } from './useAuth';

const Auth = () => {
    let navigate = useNavigate();
    const { signin } = useAuth();
    const [error] = useState(false);
    const { request } = useHttp();
    const [user, setUser] = useState('');
    const { updateStore } = useContext(StoreContext);

    const handleSignIn = async () => {
        try {
            const data = await request('api/auth/signin', 'POST', { name: user });

            if (data) {
                updateStore('user', data);
                socket.emit('joinClient', data);

                signin(user, () => {
                    navigate(Routes.Messanger, { replace: true });
                });
            }
        } catch (error) {}
    };

    const handleChangeUsername = (e: any) => {
        setUser(e.target.value);
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };

    return (
        <div className='Auth'>
            {error && <div className='Auth__error'>This name is already exist</div>}
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
            </div>
        </div>
    );
};

export { Auth };
