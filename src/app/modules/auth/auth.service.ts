import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { UserModel, beforeUserSave } from './auth.utils';

// const createAdminAuthUser = async (data: Admin): Promise<Partial<Admin>> => {
//   await beforeAdminSave(data);
//   // console.log(afterHash);
//   const result = await prisma.admin.create({
//     data, // Ensure the correct type here,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       password: false,
//       role: true,
//     },
//   });
//   return result;
// };
const createAuthUser = async (data: User): Promise<Partial<User>> => {
  await beforeUserSave(data);
  // console.log(afterHash);
  const result = await prisma.user.create({
    data, // Ensure the correct type here,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
    },
  });
  console.log(result);
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExsist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExsist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exsist');
  }

  if (
    isUserExsist.password &&
    !(await UserModel.isPasswordMatched(password, isUserExsist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, email: emailId, role } = isUserExsist;

  //Token
  const accessToken = jwtHelpers.createToken(
    { userId, emailId, role, password },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, emailId, password },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );
  jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
  return { accessToken, refreshToken };
};
// const loginAdminUser = async (
//   payload: ILoginUser,
// ): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;

//   const isUserExsist = await prisma.admin.findFirst({
//     where: {
//       email,
//     },
//   });

//   if (!isUserExsist) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       `No admin account exsist with this email: ${email}`,
//     );
//   }

//   if (
//     isUserExsist.password &&
//     !(await UserModel.isPasswordMatched(password, isUserExsist?.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   const { id: userId, email: emailId, role } = isUserExsist;

//   //Token
//   const accessToken = jwtHelpers.createToken(
//     { userId, emailId, role, password },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { userId, emailId, password },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string,
//   );
//   jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
//   return { accessToken, refreshToken };
// };
// const loginSuperAdminUser = async (
//   payload: ILoginUser,
// ): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;

//   const isUserExsist = await prisma.superAdmin.findFirst({
//     where: {
//       email,
//     },
//   });

//   if (!isUserExsist) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       `No super admin account exsist with this email: ${email}`,
//     );
//   }

//   if (
//     isUserExsist.password &&
//     !(await UserModel.isPasswordMatched(password, isUserExsist?.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   const { id: userId, email: emailId, role } = isUserExsist;

//   //Token
//   const accessToken = jwtHelpers.createToken(
//     { userId, emailId, role, password },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { userId, emailId, password },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string,
//   );
//   jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
//   return { accessToken, refreshToken };
// };

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  // invalid token
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
    // verifiedToken = jwt.verify(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { emailId } = verifiedToken;
  console.log(emailId);
  const isUserExsist = await UserModel.isUserExist(emailId);

  //Generate new token
  if (!isUserExsist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exsist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExsist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthUserService = {
  createAuthUser,
  // createAdminAuthUser,
  loginUser,
  refreshToken,
  // loginAdminUser,
  // loginSuperAdminUser,
};
