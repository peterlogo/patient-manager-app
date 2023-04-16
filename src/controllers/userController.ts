import { Request, Response } from 'express';
import { userService } from '../services';

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    const user = await userService.getById(userId)
    if (!user) res.status(400).json({ message: 'User not found' })
    res.status(200).json({data: user})
};
