export type IReviewFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type IReviewResponse = {
  id: string;
  userId: string;
  serviceId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
};
