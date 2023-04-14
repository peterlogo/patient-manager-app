import mongoose, { Schema } from 'mongoose';
import { User, UserRole } from '../types';

const UserSchema: Schema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, default: UserRole.USER }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>('User', UserSchema);
