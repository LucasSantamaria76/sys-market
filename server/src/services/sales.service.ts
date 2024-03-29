import { prisma } from '..';
import { ERROR_CODES } from '../constants/error';
import dayjs from 'dayjs';

export const SalesService = {
	create: async (paymentMethod: number, total: number, items: any[]) => {
		try {
			const sale = await prisma.sale.create({
				data: {
					total,
					paymentMethod,
					date: dayjs().toDate().toISOString(),
					items: {
						create: items.map(({ quantity, price, barcode }): any => ({
							quantity,
							price,
							product: {
								connect: {
									barcode,
								},
							},
						})),
					},
				},
			});
			return { success: true, sale };
		} catch (error: any) {
			console.log({ error });
			return {
				sucess: false,
				error: ERROR_CODES[error.code] || 'Hubo un error al crear el producto',
				fields: error.meta?.target,
			};
		}
	},
	getAll: async (date?: any) => {
		const dateFormat = dayjs(date).toDate().toISOString();
		const dateFilter = date
			? {
					date: {
						equals: dateFormat,
					},
			  }
			: {};
		try {
			const sales = await prisma.sale.findMany({
				where: dateFilter,
				include: {
					items: {
						include: {
							product: {
								select: {
									photoURL: true,
									description: true,
								},
							},
						},
					},
				},
			});
			return { success: true, sales };
		} catch (error: any) {
			console.log({ error });
			return {
				success: false,
				error: ERROR_CODES[error.code] || 'Hubo un error al recuperar las ventas',
				fields: error.meta?.target,
			};
		}
	},
};
