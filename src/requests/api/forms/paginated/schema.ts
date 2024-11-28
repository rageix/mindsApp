import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IFormFilter extends IPagination {
  text?: string;
  teamId: MongoId;
}
