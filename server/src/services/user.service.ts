import { prisma } from '..';
import { ERROR_CODES } from './../constants/error';

export class UserService {
  constructor() {}

  public static async create({ userName, password }: any) {
    try {
      const user = await prisma.user.create({
        data: {
          userName,
          password,
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
  }
  public static async getAll() {
    try {
      const users = await prisma.user.findMany({});
      return { success: true, users };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los usuarios',
        fields: error.meta?.target,
      };
    }
  }
  public static async getByUserName(userName: string) {
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
  }
}
