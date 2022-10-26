import { action, makeAutoObservable, observable } from 'mobx';
import { iUser, User } from '../models';

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

    public logIn(data: iUser, cb?: () => void) {
        this.user = new User(data);
        this.isAuthorised = true;
        cb && cb();
    }

    public logOut() {
        this.user = new User();
        this.isAuthorised = false;
    }

    get getUser() {
        return this.user;
    }

    get getAuthorisedStatus() {
        return this.isAuthorised;
    }
}

export default new Store();
