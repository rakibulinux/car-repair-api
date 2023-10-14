export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImg?: string;
  createdAt: Date;
  updatedAt: Date;
};
