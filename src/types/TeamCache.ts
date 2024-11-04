import { ITeam } from './Team';

export interface ITeamCache extends Pick<ITeam, 'name' | 'avatar'> {}
