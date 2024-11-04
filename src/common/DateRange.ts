import z from 'zod';

// {DateRange} from 'react-day-picker'
export const dateRangeSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});
