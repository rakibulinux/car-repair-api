import { Service } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constant';
import { IServiceResponse } from './service.interface';
import { ServiceService } from './service.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.createService(req.body);
  sendResponse<Partial<Service>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} Created Successfully!`,
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await ServiceService.getAllServices(filters, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Services Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ServiceService.getSingleService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Service Successfully',

    data: result,
  });
});
const updateSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await ServiceService.updateSingleService(id, body);
  sendResponse<Partial<IServiceResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Updated Successfully!',
    data: result,
  });
});
const deleteSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ServiceService.deleteSingleService(id);
  sendResponse<Partial<IServiceResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Deleted Successfully!',
    data: result,
  });
});

export const ServiceController = {
  // createService,
  getAllServices,
  getSingleService,
  updateSingleService,
  deleteSingleService,
  createService,
};
