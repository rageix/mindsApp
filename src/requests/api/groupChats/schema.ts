import { MongoId } from '@/types/MongoDocument';

export interface IGroupChatPost {
  personas: string[];
}

export interface IDeleteRequest {
  ids: MongoId[];
}
