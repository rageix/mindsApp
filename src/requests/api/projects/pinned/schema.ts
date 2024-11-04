import { MongoId } from '../../../../types/MongoDocument';

export interface IProjectPinnedRequest {
  projectId: MongoId;
  pinned: boolean;
}
