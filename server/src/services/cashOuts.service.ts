import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '..';
import { ERROR_CODES } from '../constants/error';

export const CashOutsService = {
  create: async ({ amount, description, date }: Prisma.cashOutsCreateInput) => {
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
  },
  getAll: async () => {
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
  },
  getTotalPerDay: async () => {
    try {
      const data = await prisma.cashOuts.groupBy({
        by: ['date'],
        _sum: {
          amount: true,
        },
      });

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al hacer la consulta',
        fields: error.meta?.target,
      };
    }
  },
  update: async (id: string, body: Prisma.cashOutsCreateInput) => {
    try {
      const data = await prisma.cashOuts.update({
        where: { id },
        data: {
          ...body,
        },
      });
      console.log(data);
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al actualizar la consulta',
        flields: error.meta?.target,
      };
    }
  },
  delete: async (id: string) => {
    try {
      const data = await prisma.cashOuts.delete({ where: { id } });
      console.log(data);
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: ERROR_CODES[error?.code] || 'Hubo un error al eliminar la salida',
        fields: error.meta?.target,
      };
    }
  },
};
