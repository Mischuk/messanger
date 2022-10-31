import { UserModel } from './UserModel';

export interface TokenModel {
    id: string;
    user: Omit<UserModel, 'password'>;
    refreshToken: string;
}
