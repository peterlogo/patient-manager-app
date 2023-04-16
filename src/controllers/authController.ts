import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserService } from '../services';
import { config } from '../config';

const { jwtSecret } = config;
const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await userService.getByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.create({
      ...req.body,
      password: hashedPassword
    });
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
