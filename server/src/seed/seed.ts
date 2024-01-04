import bcryptjs from 'bcryptjs';
import { TProduct, TUser } from '../types';

interface TProvider {
	nameProvider: string;
	address: string;
	phone: string;
}

interface SeedData {
	users: TUser[];
	products: TProduct[];
	providers: TProvider[];
	/*  categories: string[];
	 */
}

export const initialData: SeedData = {
	users: [
		{
			userName: 'admin',
			password: bcryptjs.hashSync('admin123'),
			role: 'ADMIN',
		},
		{
			userName: 'user',
			password: bcryptjs.hashSync('user123'),
			role: 'OPERATOR',
		},
	],

	products: [
		{
			barcode: '7790387013627',
			description: 'Yerba Mate con Palo 4Flex Taragui 500 Gr',
			price: 1000 * 1.4,
			stock: 0,
			benefit: 40,
			cost: 1000,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7790387013627.jpg',
		},
		{
			barcode: '7790387015317',
			description: 'Yerba 4 Flex Mañanita 1 Kg',
			price: 2500 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 2500,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7790387015317.jpg',
		},
		{
			barcode: '7791004000099',
			description: 'Sal Gruesa en Paquete Celusal 1 Kg',
			price: 550 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 550,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7791004000099.jpg',
		},
		{
			barcode: '7790272001005',
			description: 'Aceite de Girasol Natura 900 Ml',
			price: 1000 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 1000,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7790272001005.jpg',
		},
		{
			barcode: '7791476034011',
			description: 'Lentejas Secas Egran 400 Gr',
			price: 650 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 650,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7791476034011.jpg',
		},
		{
			barcode: '7794870001344',
			description: 'Arroz Largo Fino Primor 1 Kg',
			price: 700 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 700,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7794870001344.jpg',
		},
		{
			barcode: '7792590001064',
			description: 'Harina Leudante Caserita 1 Kg',
			price: 400 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 400,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7792590001064.jpg',
		},
		{
			barcode: '7791250000935',
			description: 'Vino Tinto Malbec Seleccion Los Arboles 750 Cc',
			price: 1500 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 1500,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7791250000935.jpg',
		},
		{
			barcode: '7792798007387',
			description: 'Cerveza Rubia Cristal Quilmes 1 Lt',
			price: 750 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 750,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7792798007387.jpg',
		},
		{
			barcode: '7793147570606',
			description: 'Cerveza Rubia Lata Schneider 710 Ml',
			price: 900 * 1.4,
			stock: 6,
			benefit: 40,
			cost: 900,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7793147570606.jpg',
		},
		{
			barcode: '7790895640025',
			description: 'Bebida Isotonica Mountain Blast Powerade 500 Ml',
			price: 500 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 500,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7790895640025.jpg',
		},
		{
			barcode: '7791813420385',
			description: 'Gaseosa Pomelo Paso de los Toros 500 Cc',
			price: 400 * 1.4,
			stock: 5,
			benefit: 40,
			cost: 400,
			photoURL: 'https://imagenes.preciosclaros.gob.ar/productos/7791813420385.jpg',
		},
	],
	providers: [
		{
			nameProvider: 'Proveedor 1',
			address: 'Calle 1',
			phone: '555-5551',
		},
		{
			nameProvider: 'Proveedor 2',
			address: 'Calle 2',
			phone: '555-5552',
		},
		{
			nameProvider: 'Proveedor 3',
			address: 'Calle 3',
			phone: '555-5553',
		},
		{
			nameProvider: 'Proveedor 4',
			address: 'Calle 4',
			phone: '555-5554',
		},
	],
};
