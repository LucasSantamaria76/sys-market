/* eslint-disable no-unused-vars */
import * as z from 'zod';
import { required_error, invalid_type_error, numberMsg, barcodeMsg, min4 } from './errorMessages';

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

export const productSchema = z.object({
  barcode: z
    .string()
    .regex(/^\D*\d{13}$/, { message: barcodeMsg })
    .trim(),
  description: z.string().min(4, { message: min4 }),
  price: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  cost: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  benefit: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
  stock: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
  providerID: z.number({ required_error, invalid_type_error }).int({ message: invalid_type_error }),
});

export const productEditSchema = z.object({
  description: z.string().min(4, { message: min4 }),
  price: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  cost: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
  benefit: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
  stock: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
});
