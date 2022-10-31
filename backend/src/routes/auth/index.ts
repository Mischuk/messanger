import { Router } from 'express';
import UserController from '../../controllers/UserController';

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.post('/signout', UserController.signOut);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);

export default router;
