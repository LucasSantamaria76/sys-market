import bcryptjs from 'bcryptjs';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';
import { TUser } from '../types';

export const AuthService = {
	register: async ({ password, ...restUserData }: TUser) => {
		const hashedPassword = await bcryptjs.hashSync(password);
		return await UserService.create({ ...restUserData, password: hashedPassword });
	},
	login: async (userName: string) => {
		const SECRET = process.env.SECRET || '';
		return jwt.sign({ userName }, SECRET, {
			expiresIn: '8h',
		});
	},
};
