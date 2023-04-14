import {
  DataAccessObject,
  IUserService,
  MongoID,
  User,
  UserServiceOption
} from '../../types';
import { generateAvatar } from '../../utils';

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
   * @returns {Promise<User & { _id: MongoID } | undefined>}
   */
  async create(user: User): Promise<(User & { _id: MongoID }) | undefined> {
    const avatar = generateAvatar(user.email);
    const data: User = { ...user, avatar };
    const newUser = this.userDao.create(data);
    return newUser;
  }

  /**
   * Get a user by id
   * @param id
   * @returns {Promise<User & { _id: MongoID } | null | undefined>}
   */
  async getById(
    id: string
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    const user = this.userDao.get({ _id: id });
    return user;
  }

  /**
   * Get a user by email
   * @param email
   * @returns {Promise<User & { _id: MongoID } | null | undefined>}
   */
  async getByEmail(
    email: string
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    const user = this.userDao.get({ email });
    return user;
  }

  /**
   * Get all users
   * @param limit
   * @param cursor
   * @returns {Promise<(User & { _id: MongoID; createdAt: Date })[] | undefined>}
   */
  async getUsers(
    limit: number,
    cursor?: string | undefined
  ): Promise<(User & { _id: MongoID; createdAt: Date })[] | undefined> {
    const users = await this.userDao.getAll(limit, cursor);
    return users;
  }

  /**
   * Update a user
   * @param id
   * @param user
   * @returns {Promise<User & { _id: MongoID } | null | undefined>}
   */
  async update(
    id: string,
    user: Partial<User>
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    const updatedUser = this.userDao.update(id, user);
    return updatedUser;
  }

  /**
   * Delete a user
   * @param id
   * @returns {Promise<User & { _id: MongoID } | null | undefined>}
   */
  async delete(
    id: string
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    const deletedUser = this.userDao.delete(id);
    return deletedUser;
  }
}
