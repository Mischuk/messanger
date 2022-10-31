import { UserModel } from '../models/UserModel';
import { prepareString } from '../utils';
import { updateFile } from '../utils/fs';

const file = require('../data/newUsers.json');

interface UsersServicesDB {
    users: UserModel[];
}

class UsersService_DB implements UsersServicesDB {
    users: UserModel[] = (file && file.data) || [];

    public getUsers(): UserModel[] {
        return this.users;
    }

    public findOne(
        field: keyof UserModel,
        name: string
    ): UserModel | undefined {
        const users = this.getUsers();
        return users.find(
            (user) => prepareString(user[field]) === prepareString(name)
        );
    }

    public async create(newUser: UserModel): Promise<UserModel> {
        const users = this.getUsers();
        await updateFile('newUsers.json', { data: [...users, newUser] });
        return newUser;
    }
}

export default UsersService_DB;
