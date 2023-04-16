export interface IAuthenticationService {
  register(): Promise<void>;
}

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
