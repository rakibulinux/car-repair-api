import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constant';
import { IServiceFilterRequest, IServiceResponse } from './service.interface';

const createService = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
    include: {
      category: true,
      bookings: true,
      reviews: true,
    },
  });
  return result;
};

const getAllServices = async (
  filters: IServiceFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<Service[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.ServiceWhereInput =
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

  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      bookings: true,
      reviews: true,
      category: true,
    },
  });

  const total = await prisma.service.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleService = async (id: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      bookings: true,
      reviews: true,
      category: true,
    },
  });
  return result;
};
const updateSingleService = async (
  id: string,
  data: Partial<Service>,
): Promise<Partial<Service>> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteSingleService = async (
  id: string,
): Promise<Partial<IServiceResponse>> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateSingleService,
  deleteSingleService,
};
