import z from 'zod';
import { MongoId } from '@/types/MongoDocument';

export const zMinMessage = 'Must not be empty';

export const zNumberMessages = {
  required_error: zMinMessage,
  invalid_type_error: 'Must be a number',
};

export const zEmailValidator = z.string().email();
export const zStringRequiredValidator = z
  .string()
  .min(1, { message: zMinMessage });

export const zCssColorValidator = z.string().regex(/#([a-f0-9]{3}){1,2}\b/i);

export const passwordValidatorSchema = z.string().min(6);

export const passwordValidator = z.string().min(6);

export interface IDeleteRequest {
  ids: MongoId[];
}
