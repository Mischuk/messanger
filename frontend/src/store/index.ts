import { iUser, User } from '../models';

interface iStore {
    user: iUser;
    isAuthorised: boolean;
}

class Store implements iStore {
    user = new User();
    isAuthorised = false;

    public logIn(data: iUser) {
        this.user = new User(data);
        this.isAuthorised = true;
    }

    public logOut() {
        this.user = new User();
        this.isAuthorised = false;
    }

    get getUser() {
        return this.user;
    }
}

export default new Store();
