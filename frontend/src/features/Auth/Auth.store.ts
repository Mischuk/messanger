import { atom } from 'recoil';
import { iUser, User } from '../../models/user';

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
