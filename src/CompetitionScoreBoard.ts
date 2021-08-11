import { Match } from "./Match";
import { Team } from "./Team";

export class CompetitionScoreBoard {

  private matches = new Map<string, Match>();

  lastMatchId = 0;

  private getNewMatchIdentifier(): string {
    this.lastMatchId += 1;
    return this.lastMatchId.toString();
  }

  newMatch(hostTeam: Team, awayTeam: Team): string {
    const matchId = this.getNewMatchIdentifier();
    const match = new Match(matchId, hostTeam, awayTeam);
    this.matches.set(matchId, match);
    return matchId;
  }

  getMatchTotalScore(gameId: string): number | undefined {
    return this.matches.get(gameId)?.getTotalScore();
  }

  getMatchScore(gameId: string): Array<number> | undefined {
    return this.matches.get(gameId)?.getScore();
  }


  finishMatch(gameId: string): Match | undefined {
    const match = this.matches.get(gameId);

    if (match) {
      this.matches.delete(gameId);
    }

    return match
  }

  getMatch(gameId: string): Match | undefined {
    return this.matches.get(gameId);
  }

  updateMatch(gameId: string, score: [number, number]): Match | undefined {
    if (score[0] < 0 || score[1] < 0) {
      return
    }

    const match = this.matches.get(gameId);

    if (match) {
      match.updateScore(score);
    }

    return match;
  }

  getMatchSummary(): (Match | undefined)[] {
    return [ ...this.matches.keys() ]
      .map(matchId => { return { "id": parseInt(matchId), "score": this.getMatchTotalScore(matchId) }})
      .sort( function(a, b) {
        const isGreaterThan = (a: number, b: number) => { return a > b };
        const isEqual = (a: number, b: number) => { return a === b };
        const a_score = a.score || -1;
        const b_score = b.score || -1;

        if (isGreaterThan(a_score, b_score)) {
          return -1;
        }

        if (isEqual(a_score, b_score) && isGreaterThan(a.id, b.id)) {
          return -1;
        }

        return 0;
    })
    .map(match => { return this.getMatch(match.id.toString())} )
  }
}
