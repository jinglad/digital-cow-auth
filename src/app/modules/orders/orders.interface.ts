import { Model, Types } from 'mongoose';
import { ICow } from '../cows/cow.interface';
import { Iuser } from '../users/user.interface';

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | Iuser;
};

export type OrderModel = Model<IOrder>;
