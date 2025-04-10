import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IIdeaBoardFilter extends IPagination {
  text?: string;
  userId?: MongoId;
}