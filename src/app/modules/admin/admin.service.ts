import { Admin, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './admin.constant';
import { IUserFilterRequest, IUserResponse } from './admin.interface';

const getAllAdminUsers = async (
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
  const whereConditions: Prisma.AdminWhereInput =
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

  const result = await prisma.admin.findMany({
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
      bio: true,
      bookings: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleAdminUser = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      bio: true,
      role: true,
      profileImg: true,
    },
  });
  return result;
};
const updateSingleAdminUser = async (
  id: string,
  data: Partial<Admin>,
): Promise<Partial<IUserResponse>> => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
    },
  });
  return result;
};
const deleteSingleAdminUser = async (
  id: string,
): Promise<Partial<IUserResponse>> => {
  const result = await prisma.admin.delete({
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
  getAllAdminUsers,
  getSingleAdminUser,
  updateSingleAdminUser,
  deleteSingleAdminUser,
};
