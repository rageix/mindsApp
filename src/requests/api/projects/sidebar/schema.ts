import { IProject } from '../../../../types/Project';

export interface IProjectRequest
  extends Pick<IProject, '_id' | 'name' | 'pinned'> {}
