export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  price?: string | undefined;
  availability?: string | undefined;
  categoryId?: string | undefined;
};
export type IServiceFilter = {
  name?: string | undefined;
  description?: string | undefined;
  price?: string | undefined;
  availability?: string | undefined;
  categoryId?: string | undefined;
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
