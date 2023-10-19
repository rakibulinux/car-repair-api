import { Feedback, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { feedbackSearchableFields } from './feedback.constant';
import {
  IFeedbackFilterRequest,
  IFeedbackResponse,
} from './feedback.interface';

const createFeedback = async (data: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data,
    include: {
      user: true,
    },
  });
  return result;
};

const getAllFeedbacks = async (
  filters: IFeedbackFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<Feedback[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: feedbackSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.FeedbackWhereInput =
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

  const result = await prisma.feedback.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

  const total = await prisma.feedback.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFeedback = async (id: string) => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });
  return result;
};
const updateSingleFeedback = async (
  id: string,
  data: Partial<Feedback>,
): Promise<Partial<Feedback>> => {
  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
    },
  });
  return result;
};
const deleteSingleFeedback = async (
  id: string,
): Promise<Partial<IFeedbackResponse>> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateSingleFeedback,
  deleteSingleFeedback,
};
