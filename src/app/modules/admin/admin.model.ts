import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import bcrypt from 'bcrypt';

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
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
      unique: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string,
): Promise<IAdmin | null> {
  const admin = await this.findOne({ phoneNumber });
  return admin;
};

AdminSchema.statics.isPasswordMatch = async function (
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
