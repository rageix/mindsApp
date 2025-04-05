import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IResponsesPaginatedFilter extends IPagination {
  chatId?: MongoId;
  text?: string;
  userId?: MongoId;
}