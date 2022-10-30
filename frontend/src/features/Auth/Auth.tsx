import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { User } from '../../models/user';
import { Routes } from '../../routes';
import { FieldsError } from '../../utils/enum';
import './Auth.styles.scss';
import { useAuthContext } from './hooks/useAuthContext';
import { useAuthQuery } from './hooks/useAuthQuery';

const Auth = () => {
    const [inputValues, setInputValues] = useState<UserInputValues>({
        name: 'user a',
        password: 'qwerty',
    });

    const auth = useAuthQuery();
    const { signIn } = useAuthContext();
    let navigate = useNavigate();

    const isDisabled = useMemo(
        () =>
            auth.isLoading ||
            inputValues.name === '' ||
            inputValues.password === '',
        [inputValues, auth.isLoading]
    );

    const handleSignIn = () => {
        if (isDisabled) return;

        auth.mutate(inputValues, {
            onSuccess: (data) => {
                const user = new User(data);

                signIn({ ...user, token: data.token }, () => {
                    navigate(Routes.Messanger, { replace: true });
                });
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    const handleChangeInput = (key: keyof UserInputValues, value: string) => {
        auth.reset();

        setInputValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };

    return (
        <div className='Auth'>
            <div className='Auth__form'>
                <div className='Auth__column'>
                    {auth.error && auth.error.field === FieldsError.Name && (
                        <div className='Auth__error'>{auth.error.message}</div>
                    )}
                    <input
                        type='text'
                        placeholder='Your name...'
                        className='Auth__input'
                        spellCheck={false}
                        value={inputValues.name}
                        onChange={(e) =>
                            handleChangeInput('name', e.target.value)
                        }
                        onKeyUp={handleEnter}
                        disabled={auth.isLoading}
                    />
                </div>
                <div className='Auth__column'>
                    {auth.error &&
                        auth.error.field === FieldsError.Password && (
                            <div className='Auth__error'>
                                {auth.error.message}
                            </div>
                        )}
                    <input
                        type='password'
                        className='Auth__input'
                        placeholder='Your password...'
                        spellCheck={false}
                        value={inputValues.password}
                        onChange={(e) =>
                            handleChangeInput('password', e.target.value)
                        }
                        onKeyUp={handleEnter}
                        disabled={auth.isLoading}
                    />
                </div>

                <div className='Auth__submit'>
                    <Button
                        onClick={handleSignIn}
                        isLoading={auth.isLoading}
                        disabled={isDisabled}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    );
};

interface UserInputValues {
    name: string;
    password: string;
}

export default Auth;
