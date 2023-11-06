import { Router } from 'express';
import { AuthController } from '../../controllers/v1/auth';
export const authRouter = Router();
const auth = new AuthController();

authRouter.post('/login', auth.login);
authRouter.post('/user', auth.createUser);
authRouter.get('/user/:address', auth.getNonce);

