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

// const getAllServices = async (
//   filters: IServiceFilterRequest,
//   pagination: IPaginationOptions,
// ): Promise<IGenericResponse<Service[]>> => {
//   const { searchTerm, ...filtersData } = filters;
//   console.log('filtersData', filtersData, 'searchTerm', searchTerm);
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(pagination);
//   const andConditions = [];
//   // Search needs $or for searching in specified fields
//   if (searchTerm) {
//     andConditions.push({
//       OR: serviceSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }
//   const whereConditions: Prisma.ServiceWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       AND: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   console.log('whereConditions', whereConditions);
//   console.log('andConditions', andConditions);

//   // Dynamic  Sort needs  field to  do sorting
//   const sortConditions: { [key: string]: string } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const result = await prisma.service.findMany({
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy: sortConditions,
//     include: {
//       bookings: true,
//       reviews: true,
//       category: true,
//     },
//   });

//   const total = await prisma.service.count();
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

const getAllServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

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

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    include: {
      category: true,
      bookings: true,
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.service.count({
    where: whereConditions,
  });

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
