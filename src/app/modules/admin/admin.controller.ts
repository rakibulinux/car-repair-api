import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './admin.constant';
import { IUserResponse } from './admin.interface';
import { UserService } from './admin.service';

const getAllAdminUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await UserService.getAllAdminUsers(filters, pagination);
  sendResponse<Partial<IUserResponse[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAdminUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleAdminUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single User Successfully',

    data: result,
  });
});
const updateSingleAdminUser = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const result = await UserService.updateSingleAdminUser(id, body);
    sendResponse<Partial<IUserResponse>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Updated Successfully!',
      data: result,
    });
  },
);
const deleteSingleAdminUser = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteSingleAdminUser(id);
    sendResponse<Partial<IUserResponse>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Deleted Successfully!',
      data: result,
    });
  },
);

export const UserController = {
  // createUser,
  getAllAdminUsers,
  getSingleAdminUser,
  updateSingleAdminUser,
  deleteSingleAdminUser,
};
