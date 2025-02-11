import { Params } from 'next/dist/server/request/params';

export interface ITeamIdParams extends Params {
  // [Key: string]: string;
  teamId: string;
}
