export type IPostFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type IPostResponse = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string | null;
  categoryId: string;
};
