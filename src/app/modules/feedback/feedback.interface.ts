export type IFeedbackFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type IFeedbackResponse = {
  id: string;
  comment: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
