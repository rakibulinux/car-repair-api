import { Review } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { reviewFilterableFields } from './review.constant';
import { IReviewResponse } from './review.interface';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.body);
  sendResponse<Partial<Review>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Review Added Successfully!`,
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await ReviewService.getAllReviews(filters, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Reviews Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewService.getSingleReview(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Review Successfully',

    data: result,
  });
});
const updateSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await ReviewService.updateSingleReview(id, body);
  sendResponse<Partial<IReviewResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Updated Successfully!',
    data: result,
  });
});
const deleteSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewService.deleteSingleReview(id);
  sendResponse<Partial<IReviewResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Deleted Successfully!',
    data: result,
  });
});

export const ReviewController = {
  getAllReviews,
  getSingleReview,
  updateSingleReview,
  deleteSingleReview,
  createReview,
};
