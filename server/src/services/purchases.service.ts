import dayjs from 'dayjs';
import { prisma } from '..';
import { IPurchase } from '../interfaces';
import { ERROR_CODES } from './../constants/error';

export class PurchasesService {
  constructor() {}

  public static async create(data: IPurchase) {
    const { products, providerId, total, paid_purchase } = data;
    //update: products.map(({ barcode, cost, benefit, quantity }) => {
    try {
      const purchase = await prisma.purchases.create({
        data: {
          total,
          paid_purchase,
          date: dayjs().toDate().toISOString(),
          provider: {
            connect: { id: providerId },
          },
        },
      });
      return { success: true, purchase };
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al cargar la compra',
        fields: error.meta?.target,
      };
    }
  }
  public static async getAll() {
    try {
      const purchases = await prisma.purchases.findMany({
        include: {
          provider: true,
        },
      });
      return { success: true, purchases };
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los datos de las compras',
        fields: error.meta?.target,
      };
    }
  }
}
