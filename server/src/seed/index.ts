import { initialData } from './seed';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.products.deleteMany();
		await prisma.user.deleteMany();
		await prisma.providers.deleteMany();

		const { users, products, providers } = initialData;

		await prisma.user.createMany({
			data: users,
		});

		await prisma.products.createMany({
			data: products,
		});

		await prisma.providers.createMany({
			data: providers,
		});

		const listProducts = await prisma.products.findMany();

		const provider = await prisma.providers.findFirst();

		listProducts.forEach(async (product) => {
			await prisma.provider_product.create({
				//@ts-ignore
				data: {
					price_cost: product.cost,
					providerID: provider?.id,
					productID: product.barcode,
				},
			});
		});

		console.log('Seed ejecutado correctamente');
	} catch (error) {
		console.log('Error al implementar la semilla');
	}
}

(() => {
	if (process.env.NODE_ENV === 'production') return;

	main();
})();
