import mongoose, { Schema } from 'mongoose';
import { User, UserRole } from '../types';

/**
 * User Schema
 * @type {Schema}
 */
const UserSchema: Schema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, default: UserRole.USER }
  },
  { timestamps: true }
);

/**
 * User Model
 * @type {mongoose.Model<User>}
 */
export const UserModel: mongoose.Model<User> = mongoose.model<User>(
  'User',
  UserSchema
);
