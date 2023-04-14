import { DataAccessObject } from './daoTypes';

/**
 * User data type definition.
 */
export interface User {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  password: string;
  role?: UserRole;
}

/**
 * User role type definition.
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

/**
 * User service options type definition.
 */
export type UserServiceOption = {
  userDao: DataAccessObject<User>;
};

/**
 * User service type definition.
 */
export interface IUserService {
  createUser(user: User): Promise<User | undefined>;
  getUserById(id: string): Promise<User | null | undefined>;
  getUserByEmail(email: string): Promise<User | null | undefined>;
  updateUser(id: string, user: Partial<User>): Promise<User | null | undefined>;
  deleteUser(id: string): Promise<User | null | undefined>;
}
