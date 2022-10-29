import { createContext, useEffect } from 'react';
import { iUser, User } from '../../models';
import { StorageKeys } from '../../utils/enum';
import { useAuth } from './useAuth';

interface AuthContextType {
    user: iUser;
    signin: (user: iUser, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const signIn = useAuth();

    useEffect(() => {
        const token = localStorage.getItem(StorageKeys.Token);
    }, []);

    let value = { user: new User(), signin: () => {}, signout: () => {} };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
