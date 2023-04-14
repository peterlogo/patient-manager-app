import mongoose from 'mongoose';
import { Logger } from 'pino';
import { DataAccessObject, MongoID, User } from '../types';
import { logger } from '../services';
import { UserModel } from '../models';

/**
 * User Data Access Object class, connects to MongoDB for providing
 * CRUD operations on user data.
 * @implements {DataAccessObject}
 */
export class UserDao implements DataAccessObject<User> {
  private user: mongoose.Model<User>;
  private logger: Logger;

  constructor() {
    this.user = UserModel;
    this.logger = logger.child({ module: 'UserDao' });
  }

  /**
   * Create a new user
   * @param data
   * @returns {Promise<(User & { _id: MongoID }) | undefined>}
   */
  async create(data: User): Promise<(User & { _id: MongoID }) | undefined> {
    try {
      const newUser = await this.user.create(data);
      return newUser;
    } catch (error) {
      this.logger.error('Failed to create user', error);
    }
  }

  /**
   * Retrieve a user
   * @param query
   * @returns {Promise<(User & { _id: MongoID }) | null | undefined>}
   */
  async get(
    query: Partial<User & { _id: MongoID }>
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    try {
      const user = await this.user.findOne(query);
      return user;
    } catch (err) {
      this.logger.error('Failed to get user', { err });
    }
  }

  /**
   * Retrieve all users
   * @param limit
   * @param cursor
   * @returns {Promise<(User & { _id: MongoID; createdAt: Date })[] | undefined>}
   */
  async getAll(
    limit: number,
    cursor?: string | undefined
  ): Promise<(User & { _id: MongoID; createdAt: Date })[] | undefined> {
    try {
      let data;

      if (cursor) {
        data = await this.user
          .find({
            _id: {
              $lte: cursor
            }
          })
          .sort({ createdAt: -1 })
          .limit(limit + 1);
        return data;
      }

      data = await this.user
        .find()
        .sort({ createdAt: -1 })
        .limit(limit + 1);
      return data;
    } catch (err) {
      this.logger.error('Failed to get all users', { err });
    }
  }

  /**
   * Update a user
   * @param id
   * @param data
   * @returns {Promise<(User & { _id: MongoID }) | null | undefined>}
   */
  async update(
    id: string,
    data: Partial<User>
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    try {
      const user = await this.user.findOneAndUpdate({ _id: id }, data, {
        new: true
      });
      return user;
    } catch (err) {
      this.logger.error('Failed to update user', { err });
    }
  }

  /**
   * Delete a user
   * @param id
   * @returns {Promise<(User & { _id: MongoID }) | null | undefined>}
   */
  async delete(
    id: string
  ): Promise<(User & { _id: MongoID }) | null | undefined> {
    try {
      const user = await this.user.findByIdAndDelete(id);
      return user;
    } catch (err) {
      this.logger.error('Failed to delete user', { err });
    }
  }
}
