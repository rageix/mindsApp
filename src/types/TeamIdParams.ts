import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export interface ITeamIdParams extends Params {
  // [Key: string]: string;
  teamId: string;
}
