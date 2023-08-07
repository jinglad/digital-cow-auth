import { Iuser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: Iuser) => {
  const newUser = await User.create(payload);
  return newUser;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const updateUserById = async (id: string, payload: Iuser) => {
  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedUser;
};

const deleteUserById = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

export const UsersService = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
