import { MongoId } from '@/types/MongoDocument';

export interface IChatsSoloPost {
  chatId?: MongoId;
  personality?: string;
  text: string;
}