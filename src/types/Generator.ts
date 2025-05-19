import { MongoDocument, MongoId } from '@/types/MongoDocument';
import { EModel } from '@/types/Model';

export interface IGeneratorInput {
  count: number;
  directions: string;
  text: string;
  models: Record<EModel, boolean>;
}

export interface IGenerator extends MongoDocument{
  userId: MongoId,
  input: IGeneratorInput,
  output: Record<EModel, string | null>,
  createdAt?: Date
}