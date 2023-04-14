import {
  DataAccessObject,
  IUserService,
  User,
  UserServiceOption
} from '../../types';

/**
 * User service connects to the User Data Access Object
 * to perform CRUD operations on users.
 * @implements {IUserService}
 */
export class UserService implements IUserService {
  private userDao: DataAccessObject<User>;

  constructor({ userDao }: UserServiceOption) {
    this.userDao = userDao;
  }

  /**
   * Create a new user
   * @param user
   * @returns {Promise<User | undefined>}
   */
  createUser(user: User): Promise<User | undefined> {
    const newUser = this.userDao.create(user);
    return newUser;
  }

  /**
   * Get a user by id
   * @param id
   * @returns {Promise<User | null | undefined>}
   */
  getUserById(id: string): Promise<User | null | undefined> {
    const user = this.userDao.get({ _id: id });
    return user;
  }

  /**
   * Get a user by email
   * @param email
   * @returns {Promise<User | null | undefined>}
   */
  getUserByEmail(email: string): Promise<User | null | undefined> {
    const user = this.userDao.get({ email });
    return user;
  }

  /**
   * Update a user
   * @param id
   * @param user
   * @returns {Promise<User | null | undefined>}
   */
  updateUser(
    id: string,
    user: Partial<User>
  ): Promise<User | null | undefined> {
    const updatedUser = this.userDao.update(id, user);
    return updatedUser;
  }

  /**
   * Delete a user
   * @param id
   * @returns {Promise<User | null | undefined>}
   */
  deleteUser(id: string): Promise<User | null | undefined> {
    const deletedUser = this.userDao.delete(id);
    return deletedUser;
  }
}
