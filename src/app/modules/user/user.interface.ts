export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
};

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
export type IUserProfile = {
  name: string;
  bio: string;
  phoneNo: string;
  bloodGroup: string;
  gender: string;
  address: string;
  profileImg: string;
};
