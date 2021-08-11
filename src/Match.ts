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

  getScore(): [number, number] {
    return [ this.homeTeam.getScore(), this.awayTeam.getScore() ];
  }

  updateScore(score: [number, number]): [number, number]{
    this.homeTeam.setScore(score[0]);
    this.awayTeam.setScore(score[1]);
    return this.getScore();
  }

  getId(): string {
    return this.id;
  }
}
