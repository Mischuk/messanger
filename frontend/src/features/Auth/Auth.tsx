import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { User } from '../../models';
import { Routes } from '../../routes';
import store from '../../store';
import { FieldsError } from '../../utils/enum';
import './Auth.styles.scss';
import { useAuth } from './useAuth';

const Auth = () => {
    const [inputValues, setInputValues] = useState<UserInputValues>({
        name: '',
        password: '',
    });

    const signIn = useAuth();
    let navigate = useNavigate();

    const isDisabled = useMemo(
        () =>
            signIn.isLoading ||
            inputValues.name === '' ||
            inputValues.password === '',
        [inputValues, signIn.isLoading]
    );

    const handleSignIn = () => {
        if (isDisabled) return;

        signIn.mutate(inputValues, {
            onSuccess: (data) => {
                const user = new User(data);

                store.logIn({ ...user, token: data.token }, () => {
                    navigate(Routes.Messanger, { replace: true });
                });
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    const handleChangeInput = (key: keyof UserInputValues, value: string) => {
        signIn.reset();

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
                    {signIn.error &&
                        signIn.error.field === FieldsError.Name && (
                            <div className='Auth__error'>
                                {signIn.error.message}
                            </div>
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
                        disabled={signIn.isLoading}
                    />
                </div>
                <div className='Auth__column'>
                    {signIn.error &&
                        signIn.error.field === FieldsError.Password && (
                            <div className='Auth__error'>
                                {signIn.error.message}
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
                        disabled={signIn.isLoading}
                    />
                </div>

                <div className='Auth__submit'>
                    <Button
                        onClick={handleSignIn}
                        isLoading={signIn.isLoading}
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

export default observer(Auth);
