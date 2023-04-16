import { Request, Response } from 'express';
import { UserService } from '../services';

const userService = new UserService();

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.getById(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ data: user });
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updatedInfo = req.body;
  const user = await userService.update(userId, updatedInfo);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ data: user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.delete(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ data: user });
};
