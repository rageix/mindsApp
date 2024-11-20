import { IPagination } from '@/types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IDynamicFormFilter extends IPagination {
  text?: string;
  teamId: MongoId;
}
