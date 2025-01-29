import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IResumesFilter extends IPagination {
  text?: string;
  userId?: MongoId;
}