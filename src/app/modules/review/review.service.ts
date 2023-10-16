import { Prisma, Review } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { reviewSearchableFields } from './review.constant';
import { IReviewFilterRequest, IReviewResponse } from './review.interface';

const createReview = async (data: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data,
    include: {
      services: true,
    },
  });
  return result;
};

const getAllReviews = async (
  filters: IReviewFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<Review[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: reviewSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.ReviewWhereInput =
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

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      services: true,
      user: true,
    },
  });

  const total = await prisma.review.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleReview = async (id: string) => {
  const result = await prisma.review.findUnique({
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
const updateSingleReview = async (
  id: string,
  data: Partial<Review>,
): Promise<Partial<Review>> => {
  const result = await prisma.review.update({
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
const deleteSingleReview = async (
  id: string,
): Promise<Partial<IReviewResponse>> => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateSingleReview,
  deleteSingleReview,
};
