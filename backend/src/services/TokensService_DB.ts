import { TokenModel } from '../models/TokenModel';
import { updateFile } from '../utils/fs';

const file = require('../data/tokens.json');

interface TokensServicesDB {
    tokens: TokenModel[];
}

class TokensService_DB implements TokensServicesDB {
    tokens: TokenModel[] = (file && file.data) || [];

    public getTokens(): TokenModel[] {
        return this.tokens;
    }

    public findOne({ userId }: { userId: string }): TokenModel | undefined {
        const tokens = this.getTokens();
        return tokens.find((token) => token.user.id === userId);
    }

    public async create({
        id,
        user,
        refreshToken,
    }: TokenModel): Promise<TokenModel> {
        const tokens = this.getTokens();
        const newToken = { id, user, refreshToken };
        await updateFile('tokens.json', {
            data: [...tokens, newToken],
        });
        return newToken;
    }

    public async update(tokenId: string, token: TokenModel) {
        const tokens = this.getTokens();
        const idx = tokens.findIndex((token) => token.id === tokenId);

        if (idx > -1) {
            await updateFile('tokens.json', {
                data: [
                    ...tokens.splice(0, idx),
                    token,
                    ...tokens.splice(idx + 1),
                ],
            });
            return token;
        } else {
            throw new Error('No token');
        }
    }
}

export default TokensService_DB;
