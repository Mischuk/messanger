import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, password } = req.body;

            const userData = await UserService.signUp({
                name,
                password,
            });
            const d30 = 30 * 24 * 60 * 60 * 1000;
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: d30,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }

    async signOut(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json([{ a: 1 }]);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
