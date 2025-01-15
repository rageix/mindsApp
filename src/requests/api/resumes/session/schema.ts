import { MongoId } from '@/types/MongoDocument';
import { IPagination } from '@/types/Pagination';

export interface ICardsFindRequest extends IPagination {
  _id: MongoId;
  teamId: MongoId;
}
