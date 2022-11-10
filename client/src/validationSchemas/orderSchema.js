/* eslint-disable no-unused-vars */
import * as z from 'zod';

export const initialValuesOrder = {
  barcode: '',
  cost: 0,
  quantity: 0,
  benefit: 40,
};

const required_error = 'El campo es requerido';
const invalid_type_error = 'El tipo de dato ingresado no es válido';
const numberMsg = 'El campo debe tener un número positivo';

export const orderSchema = z.object({
  barcode: z.string({ required_error, invalid_type_error }),
  cost: z.number({ required_error, invalid_type_error }),
  quantity: z.number({ invalid_type_error }).optional(),
  benefit: z.number({ required_error, invalid_type_error }).nonnegative({ message: numberMsg }),
});
