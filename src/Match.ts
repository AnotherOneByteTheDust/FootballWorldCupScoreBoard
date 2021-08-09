import { Team } from './Team'

export class Match {
  homeTeam: Team
  awayTeam: Team

  constructor(homeTeam: Team, awayTeam: Team) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  getTotalScore(): number {
    return this.homeTeam.getScore() + this.awayTeam.getScore();
  }
}
