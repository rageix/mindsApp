import z from 'zod';

export interface IPaginatedResponse<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  count: number;
}

export interface IPagination {
  pageIndex?: number;
  pageSize?: number;
}

export const paginationSchema = z.object({
  pageIndex: z.number().int().optional(),
  pageSize: z.number().int().optional(),
}) satisfies z.ZodType<IPagination>;
