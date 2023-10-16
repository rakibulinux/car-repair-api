import { Post } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { postFilterableFields } from './post.constant';
import { IPostResponse } from './post.interface';
import { PostService } from './post.service';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.createPost(req.body);
  sendResponse<Partial<Post>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Post Added Successfully!`,
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await PostService.getAllPosts(filters, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Posts Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PostService.getSinglePost(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Post Successfully',

    data: result,
  });
});
const updateSinglePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await PostService.updateSinglePost(id, body);
  sendResponse<Partial<IPostResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Updated Successfully!',
    data: result,
  });
});
const deleteSinglePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PostService.deleteSinglePost(id);
  sendResponse<Partial<IPostResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Deleted Successfully!',
    data: result,
  });
});

export const PostController = {
  getAllPosts,
  getSinglePost,
  updateSinglePost,
  deleteSinglePost,
  createPost,
};
