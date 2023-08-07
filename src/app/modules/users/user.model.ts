import { Schema, model } from 'mongoose';
import { Iuser, UserModel } from './user.interface';

const UserSchema = new Schema<Iuser, UserModel>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      default: 'seller',
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    budget: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const User = model<Iuser, UserModel>('User', UserSchema);
