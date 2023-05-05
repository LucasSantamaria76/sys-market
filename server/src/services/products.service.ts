import { prisma } from '..'
import { ERROR_CODES } from '../constants/error'
import { TProduct } from '../types'

export const ProductsService = {
  create: async (prod: TProduct, providerID: number) => {
    try {
      const product = await prisma.products.create({
        data: {
          ...prod,
          providers: {
            create: [
              {
                price_cost: prod.cost,
                provider: {
                  connect: {
                    id: providerID
                  }
                }
              }
            ]
          },
          sale: {}
        }
      })

      return { success: true, product }
    } catch (error: any) {
      console.log('error: ', error)
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al crear el producto',
        fields: error.meta?.target
      }
    }
  },
  getProductsByProvider: async (providerID: number) => {
    try {
      const data = await prisma.providers.findUnique({
        where: { id: providerID },
        include: {
          products: {
            include: {
              product: {}
            }
          }
        }
      })
      const listProducts = data?.products?.reduce(
        (acc: any, act) =>
          (acc = [
            ...acc,
            {
              barcode: act.productID,
              description: act.product.description,
              price_cost: act.price_cost,
              last_purchase: act.last_purchase,
              photoURL: act.product.photoURL
            }
          ]),
        []
      )

      return { success: true, listProducts }
    } catch (error: any) {
      console.log('error: ', error)
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los productos',
        fields: error.meta?.target
      }
    }
  },
  getAll: async () => {
    try {
      const products = await prisma.products.findMany({
        include: {
          providers: {
            include: {
              provider: {}
            }
          }
        }
      })

      return { success: true, products }
    } catch (error: any) {
      console.log(error.code)
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los productos',
        fields: error.meta?.target
      }
    }
  },
  getByBarcode: async (barcode: string) => {
    try {
      const product = await prisma.products.findUnique({
        where: { barcode },
        include: {
          providers: {}
        }
      })

      return { success: true, product }
    } catch (error: any) {
      console.log(error.code)
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar el producto',
        fields: error.meta?.target
      }
    }
  },
  update: async (barcode: string, prod: TProduct) => {
    try {
      const result = await prisma.products.update({
        where: { barcode },
        data: { ...prod }
      })

      return { success: true, result }
    } catch (error: any) {
      console.log({ error })
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al actualizar el producto',
        fields: error.meta?.target
      }
    }
  },

  updateStock: async (barcode: string, isReduce: boolean, quantity: number) => {
    const operation = isReduce ? { decrement: quantity } : { increment: quantity }
    try {
      const result = await prisma.products.updateMany({
        where: { barcode },
        data: {
          stock: operation
        }
      })

      return { success: true, result }
    } catch (error: any) {
      console.log(error.code)
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al actualizar el producto',
        fields: error.meta?.target
      }
    }
  },
  delete: async (barcode: string) => {
    try {
      const result = await prisma.products.delete({
        where: { barcode }
      })

      return { success: true, result }
    } catch (error: any) {
      console.log(error.code)
      return {
        success: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al eliminar el producto',
        fields: error.meta?.target
      }
    }
  }
}
