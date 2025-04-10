import { MongoDocument } from '@/types/MongoDocument';

export interface IIdeaItem {
  id: string,
  text: string,
}

export interface IIdeaBoard extends MongoDocument{
  name: string,
  items: IIdeaItem[],
  updatedAt?: Date
}