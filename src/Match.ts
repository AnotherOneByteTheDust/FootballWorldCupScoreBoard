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

  getScore(): Array<number> {
    return [ this.homeTeam.getScore(), this.awayTeam.getScore() ];
  }

  updateScore(score: Array<number>): Array<number> {
    this.homeTeam.setScore(score[0]);
    this.awayTeam.setScore(score[1]);
    return this.getScore();
  }

  getId(): string {
    return this.id;
  }
}
