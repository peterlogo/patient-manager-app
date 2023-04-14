import { DataAccessObject, MongoID } from './daoTypes';

/**
 * User data type definition.
 */
export interface User {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  password?: string;
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
  create(user: User): Promise<(User & { _id: MongoID }) | undefined>;
  getById(id: string): Promise<(User & { _id: MongoID }) | null | undefined>;
  getUsers(
    limit: number,
    cursor?: string
  ): Promise<Array<User & { _id: MongoID; createdAt: Date }> | undefined>;
  getByEmail(
    email: string
  ): Promise<(User & { _id: MongoID }) | null | undefined>;
  update(
    id: string,
    user: Partial<User>
  ): Promise<(User & { _id: MongoID }) | null | undefined>;
  delete(id: string): Promise<(User & { _id: MongoID }) | null | undefined>;
}
