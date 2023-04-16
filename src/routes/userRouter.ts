import { Router } from 'express';
import passport from 'passport';
import { getUser, updateUser, deleteUser } from '../controllers';

const userRouter = Router();

userRouter.use(passport.authenticate('jwt', { session: false }));

userRouter.get('/:id', getUser);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export { userRouter };
