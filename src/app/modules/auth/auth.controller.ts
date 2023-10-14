import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthUserService } from './auth.service';

// const createAdminAuthUser = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthUserService.createAdminAuthUser(req.body);
//   sendResponse<Partial<User>>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `${result?.role} Created Successfully!`,
//     data: result,
//   });
// });
const createAuthUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthUserService.createAuthUser(req.body);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.role} Created Successfully!`,
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthUserService.loginUser(loginData);
  const { refreshToken, ...others } = result;
  // console.log(others);
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  if (refreshToken)
    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully',
      data: others,
    });
});
// const loginAdminUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthUserService.loginAdminUser(loginData);
//   const { refreshToken, ...others } = result;
//   // console.log(others);
//   const cookieOption = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOption);

//   if (refreshToken)
//     sendResponse<ILoginUserResponse>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Admin Login Successfully',
//       data: others,
//     });
// });
// const loginSuperAdminUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthUserService.loginSuperAdminUser(loginData);
//   const { refreshToken, ...others } = result;
//   // console.log(others);
//   const cookieOption = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOption);

//   if (refreshToken)
//     sendResponse<ILoginUserResponse>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Super Admin Login Successfully',
//       data: others,
//     });
// });

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthUserService.refreshToken(refreshToken);

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  if (refreshToken)
    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New access token generated successfully!',
      data: result,
    });
});

export const AuthUserController = {
  createAuthUser,
  loginUser,
  refreshToken,
  // createAdminAuthUser,
  // loginAdminUser,
  // loginSuperAdminUser,
};
