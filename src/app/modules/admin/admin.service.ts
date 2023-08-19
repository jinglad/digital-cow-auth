/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createAdmin = async (admin: IAdmin) => {
  const newAdmin = await Admin.create(admin);
  return newAdmin;
};

const getProfile = async (user: JwtPayload | null) => {
  const profile = await Admin.findById(user?.userId);
  return profile;
};

const updateProfile = async (user: JwtPayload | null, payload: IAdmin) => {
  const id = user?.userId;
  const isProfileExist = await Admin.findById(id);
  if (!isProfileExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IAdmin> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedUserData, {
    new: true,
  });
  return result;
};

export const AdminService = {
  createAdmin,
  getProfile,
  updateProfile,
};
