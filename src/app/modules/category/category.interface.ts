export type ICategoryFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type ICategoryResponse = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string | null;
};
