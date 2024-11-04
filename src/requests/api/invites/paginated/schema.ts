import { IPagination } from '../../../../types/Pagination';
import { MongoId } from '@/types/MongoDocument';

export interface IInvitesFilters extends IPagination {
  text?: string;
  teamId: MongoId;
}
