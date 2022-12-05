import { IUser } from '../interfaces';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';

export const AuthService = {
  register: async ({ password, ...restUserData }: IUser) => {
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
