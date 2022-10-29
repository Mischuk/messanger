import { action, makeAutoObservable, observable } from 'mobx';
import { iUser, User } from '../models';
import { API__USER_AUTH } from '../models/api';
import { api } from '../utils/axiosInstance';

interface iStore {
    user: iUser;
    isAuthorised: boolean;
}

class Store implements iStore {
    user = new User();
    isAuthorised = false;

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            isAuthorised: observable,
            logIn: action.bound,
            logOut: action.bound,
        });
    }

    public logIn(data: API__USER_AUTH, cb?: () => void) {
        this.user = new User(data);
        this.isAuthorised = true;
        const token = data.token;
        localStorage.setItem('jwt', token);
        api.defaults.headers.common = { Authorization: `Bearer ${token}` };
        cb && cb();
    }

    public logOut(cb?: () => void) {
        this.user = new User();
        this.isAuthorised = false;
        localStorage.removeItem('jwt');
        delete api.defaults.headers.common['Authorization'];
        cb && cb();
    }

    get getUser() {
        return this.user;
    }

    get getAuthorisedStatus() {
        return this.isAuthorised;
    }
}

export default new Store();
