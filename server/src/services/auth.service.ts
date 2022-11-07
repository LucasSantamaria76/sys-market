import { IUser } from '../interfaces';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor() {}

  public static async register({ password, userName }: IUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const authData = UserService.create({ userName, password: hashedPassword });
    return authData;
  }
  public static async login(userName: string) {
    const SECRET = process.env.SECRET || '';

    return jwt.sign({ userName }, SECRET, {
      expiresIn: '1h',
    });
  }
}
