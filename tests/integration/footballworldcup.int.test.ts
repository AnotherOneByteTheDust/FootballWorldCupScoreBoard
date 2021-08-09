import { FootballWorldCupScoreBoard } from '../../src/FootballWorldCupScoreBoard'
import { Team } from '../../src/Team';

const scoreboard = new FootballWorldCupScoreBoard();

describe('Competition Score Board', () => {

  describe('Start a new game', () => {
    it('should be able to start a new game', () => {
      const hostTeam = new Team("Alemania");
      const awayTeam = new Team("Francia");

      const game = scoreboard.newGame(hostTeam, awayTeam);

      expect(game).toBeDefined();
    })

    it('should have total score equals to 0', () => {
      const hostTeam = new Team("Alemania");
      const awayTeam = new Team("Francia");

      const game = scoreboard.newGame(hostTeam, awayTeam);
      const totalScore = scoreboard.getMatchTotalScore(game);

      expect(totalScore).toEqual(0);
    })
  })
})
