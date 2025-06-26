import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IGroupChatPaginatedFilter extends IPagination {
  text?: string;
  userId?: MongoId;
}