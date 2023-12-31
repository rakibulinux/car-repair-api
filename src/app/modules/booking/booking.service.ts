import { Booking, BookingStatus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookingSearchableFields } from './booking.constant';
import { IBookingFilterRequest, IBookingResponse } from './booking.interface';

const createBooking = async (data: Booking): Promise<Booking | null> => {
  // Check if a booking with the same serviceId, userId, and status PENDING exists
  const existingBooking = await prisma.booking.findFirst({
    where: {
      serviceId: data.serviceId,
      userId: data.userId,
      status: BookingStatus.PENDING || BookingStatus.FIXING,
    },
  });

  if (existingBooking) {
    // A booking with the same criteria already exists, don't create a new one
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking already exsist');
  } else {
    // Create a new booking
    const result = await prisma.booking.create({
      data,
      include: {
        services: true,
        user: true,
      },
    });
    return result;
  }
};

const getAllBookings = async (
  filters: IBookingFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<Booking[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.BookingWhereInput =
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

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      services: true,
      user: true,
    },
  });

  const total = await prisma.booking.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      services: true,
    },
  });
  return result;
};
const updateSingleBooking = async (
  id: string,
  data: Partial<Booking>,
): Promise<Partial<Booking>> => {
  console.log(id, data);
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
      services: true,
    },
  });
  return result;
};
const deleteSingleBooking = async (
  id: string,
): Promise<Partial<IBookingResponse>> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
};
