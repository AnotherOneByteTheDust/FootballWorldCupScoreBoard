import { FootballWorldCupScoreBoard } from '../../src/FootballWorldCupScoreBoard'
import { Team } from '../../src/Team';

const scoreboard = new FootballWorldCupScoreBoard();

describe('Competition Score Board', () => {

  describe('Start a new game', () => {

    let game: string;

    beforeAll(() => {
      const hostTeam = new Team("Alemania");
      const awayTeam = new Team("Francia");

      game = scoreboard.newGame(hostTeam, awayTeam);
    })

    it('should be able to start a new game', () => {
      expect(game).toBeDefined();
    })

    it('should have total score equals to 0 when a game is started', () => {
      const totalScore = scoreboard.getMatchTotalScore(game);

      expect(totalScore).toEqual(0);
    })
  })
})
