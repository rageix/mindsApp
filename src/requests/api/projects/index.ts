import { deleteJson, getJson, postJson } from '@/util/Requests';
import { IDeleteRequest } from '@/util/Validators';
import { IProjectRequest } from '@/requests/api/projects/schema';
import { IProject } from '@/types/Project';
import { MongoId } from '@/types/MongoDocument';
import { IHasId } from '@/types/HasId';

const url = process.env.NEXT_PUBLIC_API_HOST + '/api/projects';

export async function getApiProjectsId(
  _id: MongoId,
): Promise<IHasId<IProject> | null> {
  return await getJson<IHasId<IProject>>(url + '/' + _id);
}

export async function postApiProjects(
  arg: IProjectRequest,
): Promise<IHasId<IProject> | null> {
  return await postJson<IProjectRequest, IHasId<IProject>>(url, arg);
}

export async function deleteApiProjects(arg: IDeleteRequest): Promise<null> {
  return await deleteJson<IDeleteRequest, null>(url, arg);
}
