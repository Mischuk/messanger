import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/UserModel';
import { JWT_SECRET } from '../utils/constants';
import TokensService_DB from './TokensService_DB';
import UsersService_DB from './UsersService_DB';

const Tokens = new TokensService_DB();
const Users = new UsersService_DB();

class TokenService {
    public generateTokens(payload: string | object | Buffer): {
        accessToken: string;
        refreshToken: string;
    } {
        const accessToken = jwt.sign(payload, JWT_SECRET.ACCESS, {
            expiresIn: '30m',
        });
        const refreshToken = jwt.sign(payload, JWT_SECRET.REFRESH, {
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public getTokenUserData(user: UserModel): Omit<UserModel, 'password'> {
        return {
            id: user.id,
            name: user.name,
        };
    }

    public async saveToken({
        userId,
        refreshToken,
    }: {
        userId: string;
        refreshToken: string;
    }) {
        const tokenData = Tokens.findOne({ userId });

        if (tokenData) {
            return Tokens.update(tokenData.id, { ...tokenData, refreshToken });
        }

        const tokenId = uuidv4();
        const user = await Users.findOne('id', userId);

        if (!user) throw new Error(`UserId ${userId} does not exist`);

        const token = await Tokens.create({
            user: { id: user.id, name: user.name },
            id: tokenId,
            refreshToken,
        });

        return token;
    }
}

export default new TokenService();
