import { IPagination } from '../../../../types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IMemberFilters extends IPagination {
  text?: string;
  teamId: MongoId;
}
