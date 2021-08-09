import { Match } from "./Match";
import { Team } from "./Team";

export class FootballWorldCupScoreBoard {

  private matches = new Map<string, Match>();

  lastGameId = 0;

  private getNewGameIdentifier(): string {
    this.lastGameId += 1;
    return this.lastGameId.toString();
  }

  newGame(hostTeam: Team, awayTeam: Team): string {
    const match = new Match(hostTeam, awayTeam);
    const matchId = this.getNewGameIdentifier();
    this.matches.set(matchId, match);
    return matchId;
  }
}
