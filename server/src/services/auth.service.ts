import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

export const AuthService = {
  register: async ({ password, ...restUserData }: Prisma.userCreateInput) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserService.create({ ...restUserData, password: hashedPassword });
  },
  login: async (userName: string) => {
    const SECRET = process.env.SECRET || '';
    return jwt.sign({ userName }, SECRET, {
      expiresIn: '8h',
    });
  },
};
