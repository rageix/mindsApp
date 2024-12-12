import { IPagination } from '../../../../types/Pagination';
import { MongoId } from '@/types/MongoDocument';
import { EMemberRole } from "@/types/Member";

export interface IMemberFilters extends IPagination {
  text?: string;
  role?: EMemberRole | null;
  teamId: MongoId;
}
