import { User } from './userTypes';

/**
 * Authentication service type definition
 */
export interface IAuthenticationService {
  register(user: User): Promise<Token>;
  login(email: string, password: string): Promise<Token>;
  verifyToken(token: string): Promise<boolean>;
}

/**
 * Token type definition
 */
export type Token = {
  accessToken: string;
  refreshToken: string;
};
