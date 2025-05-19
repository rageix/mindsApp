import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IGeneratorPaginatedFilter extends IPagination {
  text?: string;
  userId?: MongoId;
}