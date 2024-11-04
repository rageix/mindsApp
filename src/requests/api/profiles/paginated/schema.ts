import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IProfilesFilters extends IPagination {
  text?: string;
  userId?: MongoId;
  teamId: MongoId;
}
