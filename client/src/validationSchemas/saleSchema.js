/* eslint-disable no-unused-vars */
import * as z from 'zod';

/* export const initialValues = {
  barcode: '',
  description: '',
  quantity: 0,
  unitPrice: 0,
  subTotal: 0,
}; */
export const labels = ['Código', 'Descripción', 'Cantidad', 'Precio un.', 'SubTotal'];

const barcodeMsg = 'El código de barras debe ser de 13 números';
const numberMsg = 'El campo debe tener un número positivo';
const required_error = 'El campo es requerido';
const invalid_type_error = 'El tipo de dato ingresado no es válido';

export const saleSchema = z.object({
  barcode: z
    .string()
    .regex(/^\D*\d{13}$/, { message: barcodeMsg })
    .trim(),
  description: z.string().min(4, { message: 'El campo debe tener un mínimo de 4 caracteres' }),
  quantity: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  unitPrice: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  subTotal: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
});
