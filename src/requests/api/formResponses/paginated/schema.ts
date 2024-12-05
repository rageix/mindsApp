import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IFormResponsesFilter extends IPagination {
  text?: string;
  teamId: MongoId;
}