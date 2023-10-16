import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryFilterableFields } from './category.constant';
import { ICategoryResponse } from './category.interface';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse<Partial<Category>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} Created Successfully!`,
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await CategoryService.getAllCategories(filters, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Categories Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.getSingleCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Category Successfully',

    data: result,
  });
});
const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await CategoryService.updateSingleCategory(id, body);
  sendResponse<Partial<ICategoryResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated Successfully!',
    data: result,
  });
});
const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.deleteSingleCategory(id);
  sendResponse<Partial<ICategoryResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted Successfully!',
    data: result,
  });
});

export const CategoryController = {
  // createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
  createCategory,
};
