import { IAuthenticationService, IUserService, Token, User } from '../../types';
import { UserService } from '../user';

export class AuthenticationService implements IAuthenticationService {
  private userService: IUserService;
  private jwtSecret: string;
  private saltRounds: number;

  constructor(jwtSecret: string, saltRounds: number) {
    this.userService = new UserService();
    this.jwtSecret = jwtSecret;
    this.saltRounds = saltRounds;
  }

  async register(user: User): Promise<Token> {
    //
  }
}
