/* eslint-disable no-unused-vars */
import * as z from 'zod';

export const initialValues = {
  barcode: '',
  description: '',
  price: 0,
  stock: 0,
  benefit: 40,
  cost: 0,
  photoURL: '',
  providerID: '',
};

const barcodeMsg = 'El código de barras debe ser de 13 números';
const numberMsg = 'El campo debe tener un número positivo';
const required_error = 'El campo es requerido';
const invalid_type_error = 'El tipo de dato ingresado no es válido';

export const productSchema = z.object({
  barcode: z
    .string()
    .regex(/^\D*\d{13}$/, { message: barcodeMsg })
    .trim(),
  description: z.string().min(4, { message: 'El campo debe tener un mínimo de 4 caracteres' }),
  price: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  cost: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  benefit: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
  stock: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
  providerID: z.number({ required_error, invalid_type_error }).int({ message: invalid_type_error }),
});

export const productEditSchema = z.object({
  description: z.string().min(4, { message: 'El campo debe tener un mínimo de 4 caracteres' }),
  price: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  cost: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  benefit: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
  stock: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
});
