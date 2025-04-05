import { MongoId } from '@/types/MongoDocument';
import { EModel } from '@/types/Model';

export interface IResponsesPost {
  chatId?: MongoId;
  model: EModel;
  text: string;
  fileId?: string;
}
