import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers';

const userRouter = Router();

userRouter.get('/:id', getUser);

userRouter.post('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export { userRouter };
