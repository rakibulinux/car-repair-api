import { Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { feedbackFilterableFields } from './feedback.constant';
import { IFeedbackResponse } from './feedback.interface';
import { FeedbackService } from './feedback.service';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.createFeedback(req.body);
  sendResponse<Partial<Feedback>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Feedback Added Successfully!`,
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, feedbackFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await FeedbackService.getAllFeedbacks(filters, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Feedbacks Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FeedbackService.getSingleFeedback(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Feedback Successfully',

    data: result,
  });
});
const updateSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await FeedbackService.updateSingleFeedback(id, body);
  sendResponse<Partial<IFeedbackResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback Updated Successfully!',
    data: result,
  });
});
const deleteSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FeedbackService.deleteSingleFeedback(id);
  sendResponse<Partial<IFeedbackResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback Deleted Successfully!',
    data: result,
  });
});

export const FeedbackController = {
  getAllFeedbacks,
  getSingleFeedback,
  updateSingleFeedback,
  deleteSingleFeedback,
  createFeedback,
};
