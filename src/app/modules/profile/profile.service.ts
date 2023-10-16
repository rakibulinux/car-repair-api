import { Profile } from '@prisma/client';
import prisma from '../../../shared/prisma';

import { JwtPayload } from 'jsonwebtoken';

const getSingleProfile = async (decodedToken: JwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });
  console.log(decodedToken);
  if (result && result.id === decodedToken.userId) {
    return result;
  }
};

const updateSingleProfile = async (
  id: string,
  data: Partial<Profile>,
): Promise<Partial<Profile>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
    },
  });
  return result;
};

export const ProfileService = {
  getSingleProfile,
  updateSingleProfile,
};
