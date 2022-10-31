import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import TokenService from './TokenService';
import UsersService_DB from './UsersService_DB';

const Users = new UsersService_DB();

class UserService {
    async signUp(data: { name: string; password: string }) {
        const isUserExist = await Users.findOne('name', data.name);

        if (isUserExist) throw new Error(`User "${data.name}" already exist`);

        const hashedPassword = await bcrypt.hash(data.password, 3);

        const id = uuidv4();

        const user = await Users.create({
            id,
            name: data.name,
            password: hashedPassword,
        });

        const TokenUser = TokenService.getTokenUserData(user);

        const generatedTokens = TokenService.generateTokens(TokenUser);

        TokenService.saveToken({
            userId: user.id,
            refreshToken: generatedTokens.refreshToken,
        });

        return {
            ...generatedTokens,
            user: TokenUser,
        };
    }
}

export default new UserService();
