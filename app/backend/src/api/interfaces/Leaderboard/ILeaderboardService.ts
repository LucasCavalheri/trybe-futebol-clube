import { ILeaderboard } from './ILeaderboard';

export type TeamType = 'home' | 'away' | 'both';

export interface ILeaderboardService {
  homeLeaderboard(team: TeamType): Promise<ILeaderboard[]>;
}
