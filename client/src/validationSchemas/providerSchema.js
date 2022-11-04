/* eslint-disable no-unused-vars */
import * as z from 'zod';

export const initialValuesAddProduct = {
  cost: 0,
  barcode: '',
};

const required_error = 'El campo es requerido';
const invalid_type_error = 'El tipo de dato ingresado no es válido';

export const providerSchema = z.object({
  nameProvider: z.string({ required_error, invalid_type_error }).min(3, 'El mínimo son 3 caracteres'),
  address: z.string({ invalid_type_error }).optional(),
  phone: z.string({ invalid_type_error }).optional(),
});
export const providerSchemaAddProduct = z.object({
  barcode: z.string({ required_error, invalid_type_error }),
  cost: z.number({ required_error, invalid_type_error }).optional(),
});
