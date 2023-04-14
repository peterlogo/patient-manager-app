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
