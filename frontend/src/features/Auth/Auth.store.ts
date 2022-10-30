import { iUser, User } from '@models/user';
import { atom } from 'recoil';

export interface iStore {
    user: iUser;
    isAuth: boolean;
}

const AuthStateInitial: iStore = {
    user: new User(),
    isAuth: false,
};

const AuthState = atom<iStore>({
    key: 'AuthStore',
    default: AuthStateInitial,
});

export { AuthState, AuthStateInitial };
