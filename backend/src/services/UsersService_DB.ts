import { UserModel } from '../models/UserModel';
import { prepareString } from '../utils';
import { readFile, updateFile } from '../utils/fs';

const file = require('../data/newUsers.json');

interface UsersServicesDB {
    users: UserModel[];
}

class UsersService_DB implements UsersServicesDB {
    users: UserModel[] = (file && file.data) || [];

    public getUsers(): UserModel[] {
        return this.users;
    }

    public async getUsersAsync(): Promise<UserModel[]> {
        const { data } = await readFile<{
            data: UserModel[];
        }>('newUsers.json');
        return data;
    }

    public async findOne(
        field: keyof UserModel,
        name: string
    ): Promise<UserModel | undefined> {
        const users = await this.getUsersAsync();
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
