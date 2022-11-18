import dayjs from 'dayjs';
import { prisma } from '..';
import { IPurchase } from '../interfaces';
import { ERROR_CODES } from './../constants/error';
import { IProductPurchase } from './../interfaces/index';
import { ProvidersService } from './provider.service';
import { CashOutsService } from './cashOuts.service';

export class PurchasesService {
  constructor() {}

  static async create(data: IPurchase) {
    const { products, providerId, total, paid_purchase } = data;

    try {
      products.forEach(async ({ barcode, benefit, cost, quantity }: IProductPurchase) => {
        const updateProduct = prisma.products.update({
          where: { barcode },
          data: {
            benefit,
            cost,
            stock: { increment: quantity },
            price: cost * (benefit / 100 + 1),
          },
        });
        const updateProviderProduct = prisma.provider_product.update({
          where: { productID_providerID: { productID: barcode, providerID: providerId } },
          data: {
            price_cost: cost,
            last_purchase: dayjs().toDate().toISOString(),
          },
        });
        await prisma.$transaction([updateProduct, updateProviderProduct]);
      });

      await prisma.purchases.create({
        data: {
          total,
          paid_purchase,
          date: dayjs().toDate().toISOString(),
          provider: {
            connect: { id: providerId },
          },
          products: {
            //@ts-ignore
            connect: products.map((prod) => ({ barcode: prod.barcode })),
          },
        },
      });
      if (paid_purchase) {
        const { nameProvider }: any = await ProvidersService.getById(providerId);
        await CashOutsService.create({ description: `Pago al Proveedor: ${nameProvider}`, amount: total });
      }

      return { success: true };
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al cargar la compra',
        fields: error.meta?.target,
      };
    }
  }
  static async getAll() {
    try {
      const purchases = await prisma.purchases.findMany({
        include: {
          provider: true,
          products: true,
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
