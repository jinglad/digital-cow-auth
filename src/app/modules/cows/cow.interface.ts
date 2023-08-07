import { Model, Types } from 'mongoose';
import { Iuser } from '../users/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: string;
  seller: Types.ObjectId | Iuser;
};

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICowLabel = 'for sale' | 'sold out';

export type ICowCategory = 'Dairy' | 'Beef' | 'Dual Purpose';

export type ICowFilterableFields = {
  searchTerm?: string;
  location?: ILocation;
};

export type CowModel = Model<ICow>;
