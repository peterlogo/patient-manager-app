import { Request, Response } from 'express';
import { AuthenticationService } from '../services';
import { config } from '../config';

const { jwtSecret, jwtRefreshSecret } = config;

const authService = new AuthenticationService(
  jwtSecret as string,
  jwtRefreshSecret as string
);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body);
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    res.status(200).json({ data: token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    res.status(200).json({ data: token });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = authService.refreshToken(req.body);
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    res.status(200).json({ data: token });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyAccessToken = async (req: Request, res: Response) => {
  try {
    const token = authService.verifyAccessToken(req.body);
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    res.status(200).json({ data: 'success' });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal server error' });
  }
};
