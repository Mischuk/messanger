import { createContext } from 'react';
import { useRecoilState } from 'recoil';
import { api } from '../../api/instances';
import { API__USER_AUTH } from '../../models/api';
import { User } from '../../models/user';
import { StorageKeys } from '../../utils/enum';
import { AuthState, AuthStateInitial, iStore } from './Auth.store';

interface AuthContextType extends iStore {
    signIn: (user: API__USER_AUTH, callback?: VoidFunction) => void;
    signOut: (callback?: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [{ isAuth, user }, setAuth] = useRecoilState(AuthState);

    const signIn = (data: API__USER_AUTH, callback = () => {}) => {
        const user = new User(data);
        setAuth({ isAuth: true, user });
        const token = data.token;
        localStorage.setItem(StorageKeys.Token, token);
        api.defaults.headers.common = { Authorization: `${token}` };
        callback();
    };

    const signOut = (callback = () => {}) => {
        setAuth(AuthStateInitial);
        localStorage.removeItem(StorageKeys.Token);
        delete api.defaults.headers.common['Authorization'];
        callback();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
