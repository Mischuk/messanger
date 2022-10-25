import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../App';
import { Button } from '../../components/Button/Button';
import { User } from '../../models';
import { Routes } from '../../routes';
import './Auth.styles.scss';
import { useAuth } from './useAuth';
import { useAuthContext } from './useAuthContext';

const Auth = () => {
    const [user, setUser] = useState('');
    const signIn = useAuth();
    const { signin: fakeSignIn } = useAuthContext();
    const { updateStore } = useContext(StoreContext);
    let navigate = useNavigate();

    const handleSignIn = () => {
        signIn.mutate(
            { name: user },
            {
                onSuccess: (data) => {
                    const user = new User(data);

                    updateStore('user', user);
                    fakeSignIn(user, () => {
                        navigate(Routes.Messanger, { replace: true });
                    });
                },
            }
        );
    };

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };

    return (
        <div className='Auth'>
            <div className='Auth__form'>
                <input
                    type='text'
                    className='Auth__input'
                    placeholder='Your name...'
                    spellCheck={false}
                    onChange={handleChangeUsername}
                    onKeyUp={handleEnter}
                    disabled={signIn.isLoading}
                />

                <div className='Auth__submit'>
                    <Button onClick={handleSignIn} isLoading={signIn.isLoading}>
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { Auth };
