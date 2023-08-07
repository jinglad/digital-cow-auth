import { Model } from 'mongoose';

export interface Iuser {
  password: string;
  role: string;
  name: IName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
}

export interface IName {
  firstName: string;
  lastName: string;
}

export type UserModel = Model<Iuser>;
