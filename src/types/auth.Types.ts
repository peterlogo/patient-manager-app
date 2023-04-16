import { User } from './userTypes';

/**
 * Authentication service type definition
 */
export interface IAuthenticationService {
  register(user: User): Promise<Token | null | undefined>;
  login(email: string, password: string): Promise<Token | null | undefined>;
  verifyToken(token: string): JwtPayload | null | undefined;
}

/**
 * Token type definition
 */
export type Token = {
  accessToken: string;
  refreshToken: string;
};

/**
 * Jwt payload type definition
 */
export type JwtPayload = {
  user: string;
}