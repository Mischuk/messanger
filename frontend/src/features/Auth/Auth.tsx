import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { useHttp } from '../../hooks/useHttp';
import './Auth.styles.scss';

const Auth = ({ onSuccess }: { onSuccess: (data: { userId: string; userName: string }) => void }) => {
    const [error] = useState(false);
    const { request } = useHttp();
    const [user, setUser] = useState('');

    const handleSignIn = async () => {
        try {
            const data = await request('api/auth/signin', 'POST', { name: user });

            if (data) {
                onSuccess(data);
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
