import { Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { categorySearchableFields } from './category.constant';
import {
  ICategoryFilterRequest,
  ICategoryResponse,
} from './category.interface';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
    include: {
      services: true,
    },
  });
  return result;
};

const getAllCategories = async (
  filters: ICategoryFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<Category[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.CategoryWhereInput =
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

  const result = await prisma.category.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    select: {
      id: true,
      name: true,
      services: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.category.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      services: true,
    },
  });
  return result;
};
const updateSingleCategory = async (
  id: string,
  data: Partial<Category>,
): Promise<Partial<Category>> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      services: true,
    },
  });
  return result;
};
const deleteSingleCategory = async (
  id: string,
): Promise<Partial<ICategoryResponse>> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      services: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
