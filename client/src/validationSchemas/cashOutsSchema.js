import * as z from 'zod';
import { required_error, invalid_type_error, numberMsg, min4 } from './errorMessages';

export const cashOutsSchema = z.object({
  description: z.string().min(4, { message: min4 }),
  amount: z.number({ required_error, invalid_type_error }).positive({ message: numberMsg }),
});
