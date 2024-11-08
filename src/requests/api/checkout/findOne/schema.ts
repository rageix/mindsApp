import { MongoId } from '@/types/MongoDocument';
import { IPagination } from '@/types/Pagination';

export interface IProfileFindRequest extends IPagination {
  _id: MongoId;
  teamId: MongoId;
}
