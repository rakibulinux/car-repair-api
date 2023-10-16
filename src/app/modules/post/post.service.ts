import { Post, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { postSearchableFields } from './post.constant';
import { IPostFilterRequest, IPostResponse } from './post.interface';

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      categories: true,
    },
  });
  return result;
};

const getAllPosts = async (
  filters: IPostFilterRequest,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<Post[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: postSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.PostWhereInput =
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

  const result = await prisma.post.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      categories: true,
      author: true,
    },
  });

  const total = await prisma.post.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSinglePost = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
      author: true,
    },
  });
  return result;
};
const updateSinglePost = async (
  id: string,
  data: Partial<Post>,
): Promise<Partial<Post>> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data,
    include: {
      categories: true,
      author: true,
    },
  });
  return result;
};
const deleteSinglePost = async (
  id: string,
): Promise<Partial<IPostResponse>> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  getSinglePost,
  updateSinglePost,
  deleteSinglePost,
};
