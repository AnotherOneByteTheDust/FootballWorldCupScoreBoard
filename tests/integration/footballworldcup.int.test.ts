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

  describe('Finish a game', () => {

    let gameIdentifiers: Array<string>;

    beforeEach(() => {
      gameIdentifiers = []

      const data = [
        { hometeam: "Alemania", awayteam: "Francia" },
        { hometeam: "España", awayteam: "Berlin" },
        { hometeam: "Mexico", awayteam: "Argentina" }
      ]

      gameIdentifiers = data.map( match => {
        const homeTeam = new Team(match["hometeam"]);
        const awayTeam = new Team(match["awayteam"]);
        return scoreboard.newGame(homeTeam, awayTeam);
      })
    })

    it('should finish a match succesfully') {
      scoreboard.finishGameById(gameIdentifiers[1]);
      const game = scoreboard.getGameById(gameIdentifiers[1]);

      expect(game).toBeUndefined();
    }
  })
})
