import { Router } from 'express';
import {
  loginUser,
  refreshToken,
  registerUser,
  verifyAccessToken
} from '../controllers';
import { validateRequestBody } from '../middleware';
import {
  accessTokenSchema,
  loginUserSchema,
  newUserSchema,
  refreshTokenSchema
} from '../utils';

const authRouter = Router();

authRouter.post('/register', validateRequestBody(newUserSchema), registerUser);

authRouter.post('/login', validateRequestBody(loginUserSchema), loginUser);

authRouter.post(
  '/refresh-token',
  validateRequestBody(refreshTokenSchema),
  refreshToken
);

authRouter.post(
  '/verify-token',
  validateRequestBody(accessTokenSchema),
  verifyAccessToken
);

export { authRouter };
