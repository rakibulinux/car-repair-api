import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constant';
import { IBookingResponse } from './booking.interface';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body);
  sendResponse<Partial<Booking>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Booking Added Successfully!`,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await BookingService.getAllBookings(filters, pagination);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Bookings Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.getSingleBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Booking Successfully',

    data: result,
  });
});
const updateSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await BookingService.updateSingleBooking(id, body);
  sendResponse<Partial<IBookingResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Updated Successfully!',
    data: result,
  });
});
const deleteSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.deleteSingleBooking(id);
  sendResponse<Partial<IBookingResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Deleted Successfully!',
    data: result,
  });
});

export const BookingController = {
  getAllBookings,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
  createBooking,
};
