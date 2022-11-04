import { prisma } from '..';
import { ERROR_CODES } from '../constants/error';

export class ProvidersService {
  constructor() {}

  public static async create(prov: any) {
    try {
      const provider = await prisma.providers.create({
        data: {
          ...prov,
        },
      });

      return provider;
    } catch (error: any) {
      return { error: ERROR_CODES[error.code], fields: error.meta?.target };
    }
  }
  public static async getAll() {
    try {
      const providers = await prisma.providers.findMany({
        include: {
          products: {},
        },
      });

      return providers;
    } catch (error: any) {
      return { error: ERROR_CODES[error.code], fields: error.meta?.target };
    }
  }
  public static async getById(id: number) {
    try {
      const provider = await prisma.providers.findUnique({
        where: { id },
        include: {
          products: {},
        },
      });

      return provider;
    } catch (error: any) {
      return { error: ERROR_CODES[error.code], fields: error.meta?.target };
    }
  }
  public static async update(id: number, prov: any) {
    try {
      const result = await prisma.providers.update({
        where: { id },
        data: { ...prov },
      });

      return result;
    } catch (error: any) {
      return { error: ERROR_CODES[error.code], fields: error.meta?.target };
    }
  }
  public static async addProduct(id: number, prod: any) {
    try {
      const result = await prisma.providers.update({
        where: { id },
        data: {
          products: {
            create: [
              {
                price_cost: prod.cost,
                product: {
                  connect: {
                    barcode: prod.barcode,
                  },
                },
              },
            ],
          },
        },
      });

      return result;
    } catch (error: any) {
      return { error: ERROR_CODES[error.code], fields: error.meta?.target };
    }
  }

  public static async delete(id: number) {
    try {
      const result = await prisma.providers.delete({
        where: { id },
      });

      return result;
    } catch (error: any) {
      return { error: ERROR_CODES[error.code], fields: error.meta?.target };
    }
  }
}
