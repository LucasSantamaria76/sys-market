/* eslint-disable no-unused-vars */
import * as z from 'zod';
import { required_error, invalid_type_error, barcodeMsg, numberMsg, greaterThanZero } from './errorMessages';

export const initialValuesProductPurchase = {
  barcode: '',
  cost: 0,
  quantity: 1,
  benefit: 40,
};

export const purchasesSchema = z.object({
  barcode: z.string({ required_error, invalid_type_error }).trim(),
  cost: z.number({ required_error, invalid_type_error }).min(1, greaterThanZero),
  quantity: z.number({ required_error, invalid_type_error }).min(1, greaterThanZero),
  benefit: z.number({ required_error, invalid_type_error }).min(1, greaterThanZero),
});
