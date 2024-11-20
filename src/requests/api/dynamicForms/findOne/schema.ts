import { MongoId } from '@/types/MongoDocument';

export interface IDynamicFormsFindRequest {
  _id: MongoId;
  teamId: MongoId;
}
