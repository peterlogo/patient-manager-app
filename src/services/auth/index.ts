import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthenticationService, IUserService, JwtPayload, Token, User } from '../../types';
import { UserService } from '../user';

export class AuthenticationService implements IAuthenticationService {
  private userService: IUserService;
  private jwtSecret: string;
  private jwtRefreshSecret: string;
  private saltRounds: number;

  constructor(jwtSecret: string, jwtRefreshSecret: string, saltRounds = 10) {
    this.userService = new UserService();
    this.jwtSecret = jwtSecret;
    this.saltRounds = saltRounds;
    this.jwtRefreshSecret = jwtRefreshSecret;
  }

  private generateToken(userId: string): Token {
    const accessToken = jwt.sign({user: userId}, this.jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({user: userId}, this.jwtRefreshSecret, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
    }
  }

  async register(user: User): Promise<Token | null | undefined> {
    const {email, password} = user;
    const userExists = await this.userService.getByEmail(email);
    if (userExists) return null
    
    const hashedPassword = await bcrypt.hash(password, this.saltRounds)
    const newUser = await this.userService.create({...user, password: hashedPassword});

    if (newUser) {
      const token = this.generateToken(newUser._id as string);
      return token;
    }
  }

  async login(email: string, password: string): Promise<Token | null | undefined> {
    const user = await this.userService.getByEmail(email);
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    const token = this.generateToken(user._id as string);
    return token;
  }

  verifyToken(token: string): JwtPayload | null | undefined {
    const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
    if (!decoded) return null
    return decoded
  }

}
