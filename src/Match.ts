import { Team } from './Team'

export class Match {

  id: string
  homeTeam: Team
  awayTeam: Team

  constructor(id: string, homeTeam: Team, awayTeam: Team) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  getTotalScore(): number {
    return this.homeTeam.getScore() + this.awayTeam.getScore();
  }

  getId(): string {
    return this.id;
  }
}
