export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export type IServiceResponse = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  availability: 'Available' | 'Upcoming';
  image: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};
