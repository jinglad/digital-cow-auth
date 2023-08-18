import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (admin: IAdmin) => {
  const newAdmin = await Admin.create(admin);
  return newAdmin;
};

export const AdminService = {
  createAdmin,
};
