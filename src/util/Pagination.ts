import { IPagination } from '@/types/Pagination';

export function makePagination(arg: IPagination): Required<IPagination> {
  return {
    pageIndex: arg.pageIndex ? arg.pageIndex : 0,
    pageSize: arg.pageSize ? arg.pageSize : 10,
  };
}
