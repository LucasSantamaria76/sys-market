import { IUser } from '../interfaces';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor() {}

  static async register({ password, ...restUserData }: IUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const authData = await UserService.create({ ...restUserData, password: hashedPassword });
    return authData;
  }
  static async login(userName: string) {
    const SECRET = process.env.SECRET || '';

    return jwt.sign({ userName }, SECRET, {
      expiresIn: '8h',
    });
  }
}
