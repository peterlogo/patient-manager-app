import { expect } from 'chai';
import mongoose, { Types } from 'mongoose';
import { DataAccessObject, User } from '../src/types';
import { config } from '../src/config';
import { UserDao } from '../src/dao';

describe('User Data Access Object', () => {
  const { mongoUri } = config;
  let userDao: DataAccessObject<User>;
  let user: User & { _id: string | Types.ObjectId };

  before(async () => {
    await mongoose.connect(mongoUri as string);
  });

  beforeEach(() => {
    userDao = new UserDao();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should have a `user` property', () => {
    expect(userDao).to.have.property('user');
  });
  it('should have a `logger` property', () => {
    expect(userDao).to.have.property('logger');
  });

  describe('create method', () => {
    it('should create a new user', async () => {
      const userData: User = {
        firstName: 'Peter',
        lastName: 'Parker',
        email: 'upchh@example.com',
        password: 'password'
      };
      const data = await userDao.create(userData);
      if (data) user = data;
      expect(data).to.be.an('object');
      expect(data).to.have.property('_id');
    });
  });

  describe('get method', () => {
    it('should get a user by id', async () => {
      const data = await userDao.get({ _id: user._id });
      expect(data).to.be.an('object');
    });
    it('should get a user by email', async () => {
      const data = await userDao.get({ email: user.email });
      expect(data).to.be.an('object');
    });
  });

  describe('getAll method', () => {
    it('should get all users', async () => {
      const data = await userDao.getAll(10);
      expect(data).to.be.an('array');
    });
  });

  describe('update method', () => {
    it('should update a user', async () => {
      const data = await userDao.update(user._id as string, {
        email: 'eathh@example.com'
      });
      expect(data).to.be.an('object');
    });
  });

  describe('delete method', () => {
    it('should delete a user', async () => {
      const data = await userDao.delete(user._id as string);
      expect(data).to.be.an('object');
    });
  });
});
