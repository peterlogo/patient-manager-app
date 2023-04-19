import { User } from './userTypes';

/**
 * Authentication service type definition
 */
export interface IAuthenticationService {
  register(user: User): Promise<Token | null | undefined>;
  login(email: string, password: string): Promise<Token | null | undefined>;
  verifyAccessToken(token: string): JwtPayload | null | undefined;
  verifyRefreshToken(token: string): JwtPayload | null | undefined;
  refreshToken(token: string): Token | null | undefined;
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
};
