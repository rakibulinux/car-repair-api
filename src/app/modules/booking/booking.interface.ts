import { BookingStatus } from '@prisma/client';

export type IBookingFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type IBookingResponse = {
  id: string;
  userId: string;
  serviceId: string;
  status: BookingStatus;
  dateTime: Date;
  createdAt: Date;
  updatedAt: Date;
};
