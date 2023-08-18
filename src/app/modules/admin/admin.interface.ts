/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { IName } from '../../../interfaces/common';

export type IAdmin = {
  _id: string;
  phoneNumber: string;
  role: string;
  password: string;
  name: IName;
  address: string;
};

export type AdminModel = {
  isAdminExist(phoneNumber: string): Promise<IAdmin>;
  isPasswordMatch(password: string, hashPassword: string): Promise<boolean>;
} & Model<IAdmin>;
