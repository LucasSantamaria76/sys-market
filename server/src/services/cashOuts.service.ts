import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '..';
import { ERROR_CODES } from '../constants/error';

export class CashOutsService {
  constructor() {}
  public static async create({ amount, description, date }: Prisma.cashOutsCreateInput) {
    try {
      const data = await prisma.cashOuts.create({
        data: {
          amount,
          description,
          date: date || dayjs().format('DD-MM-YYYY'),
        },
      });

      return { success: true, data };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al crear la salida de caja',
        fields: error.meta?.target,
      };
    }
  }
  public static async getAll() {
    try {
      const data = await prisma.cashOuts.findMany({});

      return { success: true, data };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al hacer la consulta',
        fields: error.meta?.target,
      };
    }
  }
  public static async getTotalPerDay() {
    try {
      const totalPerDay = await prisma.cashOuts.groupBy({
        by: ['date'],
        _sum: {
          amount: true,
        },
      });

      return { success: true, totalPerDay };
    } catch (error: any) {
      console.log('error: ', error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al hacer la consulta',
        fields: error.meta?.target,
      };
    }
  }
}
