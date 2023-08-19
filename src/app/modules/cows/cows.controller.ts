import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CowsService } from './cows.service';
import { ICow } from './cow.interface';
import { cowFilterableFields } from './cows.constant';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cow } = req.body;
  const result = await CowsService.createCow(cow);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});

const getCowById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowsService.getCowById(id, req.user);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow fetched successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

  const result = await CowsService.getAllCows(
    filters,
    paginationOptions,
    minPrice,
    maxPrice,
  );

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateCowById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowsService.updateCowById(id, req.body);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully',
    data: result,
  });
});

const deleteCowById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowsService.deleteCowById(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getCowById,
  updateCowById,
  deleteCowById,
};
