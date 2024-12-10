import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IResponseRatingsFilters extends IPagination {
  text?: string;
  formResponseId: MongoId;
  teamId: MongoId;
}