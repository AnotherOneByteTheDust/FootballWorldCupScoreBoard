import { Match } from "./Match";
import { Team } from "./Team";

export class FootballWorldCupScoreBoard {

  private history = Array<Match>();
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

  getMatchTotalScore(gameId: string): number | undefined {
    return this.matches.get(gameId)?.getTotalScore();
  }

  finishGameById(gameId: string): Match | undefined {
    const match = this.matches.get(gameId);

    if (match) {
      this.history.push(match);
      this.matches.delete(gameId);
    }

    return match
  }

  getGameById(gameId: string): Match | undefined {
    return this.matches.get(gameId);
  }
}
