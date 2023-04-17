import { Router } from 'express';
import { loginUser, registerUser } from '../controllers';
import { validateRequestBody } from '../middleware';
import { loginUserSchema, newUserSchema } from '../utils';

const authRouter = Router();

authRouter.post('/register', validateRequestBody(newUserSchema), registerUser);

authRouter.post('/login', validateRequestBody(loginUserSchema), loginUser);

export { authRouter };
