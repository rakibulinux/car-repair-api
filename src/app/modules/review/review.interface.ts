export type IReviewFilterRequest = {
  searchTerm?: string | undefined;
  serviceId?: string | undefined;
  userId?: string | undefined;
  comment?: string | undefined;
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
