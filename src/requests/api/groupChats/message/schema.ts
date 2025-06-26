import { MongoId } from '@/types/MongoDocument';

export interface IGroupChatsMessagePost {
  groupChatId: MongoId;
  text: string
}