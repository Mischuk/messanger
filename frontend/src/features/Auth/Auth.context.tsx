import { createContext, useState } from 'react';
import { User } from '../../models';
import { fakeAuthProvider } from '../../utils';

interface AuthContextType {
    user: User;
    signin: (user: User, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = useState<User>({ userName: '', userId: '' });

    let signin = (newUser: User, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser({ userName: '', userId: '' });
            callback();
        });
    };

    let value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
