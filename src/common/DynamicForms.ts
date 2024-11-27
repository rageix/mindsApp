import z from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';
import {
  EFieldType,
  IField,
  IFieldOption,
  ISection,
} from '@/types/DynamicForm';

export const zFieldOptionSchema = z.object({
  key: zStringRequiredValidator,
  value: z.string(),
}) satisfies z.ZodType<IFieldOption>;

export const fieldSchema = z.object({
  key: zStringRequiredValidator,
  type: z.nativeEnum(EFieldType),
  label: zStringRequiredValidator,
  isRequired: z.boolean(),
  selectOptions: z.array(zFieldOptionSchema),
  minLength: z.number(),
  maxLength: z.number(),
  isEmail: z.boolean(),
  placeholder: z.string(),
}) satisfies z.ZodType<IField>;

export const sectionSchema = z.object({
  key: zStringRequiredValidator,
  heading: zStringRequiredValidator,
  description: z.string(),
  fields: z.array(fieldSchema),
}) satisfies z.ZodType<ISection>;
