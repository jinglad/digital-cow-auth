/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { ICow, ICowFilterableFields } from './cow.interface';
import { Cow } from './cow.model';
import { cowSearchableFields } from './cows.constant';
import { JwtPayload } from 'jsonwebtoken';

const createCow = async (payload: ICow) => {
  const newCow = await Cow.create(payload);
  return newCow;
};

const getAllCows = async (
  filters: ICowFilterableFields,
  paginationOptions: IPaginationOptions,
  minPrice?: number,
  maxPrice?: number,
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      price: { $gte: minPrice, $lte: maxPrice },
    });
  } else if (minPrice !== undefined) {
    andConditions.push({
      price: { $gte: minPrice },
    });
  } else if (maxPrice !== undefined) {
    andConditions.push({
      price: { $lte: maxPrice },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getCowById = async (id: string, user: JwtPayload | null) => {
  // const cow = await Cow.findById(id);
  const cow = await Cow.findOne({ _id: id });
  return cow;
};

const updateCowById = async (id: string, payload: ICow) => {
  const updatedCow = await Cow.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedCow;
};

const deleteCowById = async (id: string) => {
  const deletedCow = await Cow.findByIdAndDelete(id);
  return deletedCow;
};

export const CowsService = {
  createCow,
  getAllCows,
  getCowById,
  updateCowById,
  deleteCowById,
};
