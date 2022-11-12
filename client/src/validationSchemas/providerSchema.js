/* eslint-disable no-unused-vars */
import * as z from 'zod';
import { required_error, invalid_type_error } from './errorMessages';

export const initialValuesAddProduct = {
  cost: 0,
  barcode: '',
};

export const providerSchema = z.object({
  nameProvider: z.string({ required_error, invalid_type_error }).min(3, 'El mínimo son 3 caracteres'),
  address: z.string({ invalid_type_error }).optional(),
  phone: z.string({ invalid_type_error }).optional(),
});
export const providerSchemaAddProduct = z.object({
  barcode: z.string({ required_error, invalid_type_error }),
  cost: z.number({ required_error, invalid_type_error }).optional(),
});
