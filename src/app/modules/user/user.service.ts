import { Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './user.constant';
import {
  IUserFilterRequest,
  IUserProfile,
  IUserResponse,
} from './user.interface';

const getAllUsers = async (
  filters: IUserFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IUserResponse[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: string } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      profile: true,
      bookings: true,
      reviews: true,
      feedbacks: true,
      posts: true,
      createdAt: true,
      notifications: true,
      updatedAt: true,
    },
  });
  const customerList = result.filter(customer => customer.role === 'customer');
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: customerList,
  };
};
const getAllAdmins = async (
  filters: IUserFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IUserResponse[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: string } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      profile: true,
      bookings: true,
      reviews: true,
      feedbacks: true,
      posts: true,
      createdAt: true,
      notifications: true,
      updatedAt: true,
    },
  });

  const adminList = result.filter(admin => admin.role === 'admin');
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: adminList,
  };
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      profile: true,
      bookings: true,
      reviews: true,
      feedbacks: true,
      posts: true,
      createdAt: true,
      notifications: true,
      updatedAt: true,
    },
  });
  return result;
};
const updateSingleUser = async (
  id: string,
  data: Partial<IUserProfile>,
): Promise<Partial<IUserResponse>> => {
  return await prisma.$transaction(async prismaClient => {
    const userName = data.name;

    const userResult = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: userName,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        profile: true,
        bookings: true,
        reviews: true,
        feedbacks: true,
        posts: true,
        createdAt: true,
        notifications: true,
        updatedAt: true,
      },
    });

    await prismaClient.profile.update({
      where: {
        id: userResult.profile?.id,
      },
      data: {
        bio: data.bio,
        bloodGroup: data.bloodGroup,
        address: data.address,
        phoneNo: data.phoneNo,
        profileImg: data.profileImg,
        gender: data.gender,
      },
    });

    return userResult;
  });
};
const deleteSingleUser = async (
  id: string,
): Promise<Partial<IUserResponse>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  });
  return result;
};

export const UserService = {
  // createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getAllAdmins,
};
