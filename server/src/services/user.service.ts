import { prisma } from '..';
import { ERROR_CODES } from './../constants/error';
import { IUser } from './../interfaces/index';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const UserService = {
  create: async (userData: Prisma.userCreateInput) => {
    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
        },
        select: {
          id: true,
          userName: true,
          role: true,
        },
      });

      return { success: true, user };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al crear el usuario',
        fields: error.meta?.target,
      };
    }
  },
  getAll: async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          userName: true,
          role: true,
        },
      });
      return { success: true, users };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los usuarios',
        fields: error.meta?.target,
      };
    }
  },
  getByUserName: async (userName: string) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({ where: { userName } });
      return { success: true, user };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Usuario no encontrado',
        fields: error.meta?.target,
      };
    }
  },
  delete: async (id: number) => {
    try {
      const res = await prisma.user.delete({ where: { id } });

      return { success: true, res };
    } catch (error: any) {
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Usuario no encontrado',
        fields: error.meta?.target,
      };
    }
  },
  changePassword: async ({ userName, password }: IUser) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await prisma.user.update({
        where: { userName },
        data: {
          password: hashedPassword,
        },
      });

      return { success: true, data };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Usuario no encontrado',
        fields: error.meta?.target,
      };
    }
  },
  update: async (id: number, dataUser: Prisma.userUpdateInput) => {
    try {
      const data = await prisma.user.update({
        where: { id },
        data: {
          ...dataUser,
        },
      });

      return { success: true, data };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Usuario no encontrado',
        fields: error.meta?.target,
      };
    }
  },
};
