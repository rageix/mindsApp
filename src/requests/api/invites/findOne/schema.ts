import { MongoId } from '@/types/MongoDocument';
import { IPagination } from '@/types/Pagination';

export interface IInviteFindRequest extends IPagination {
  _id: MongoId;
  teamId: MongoId;
}
