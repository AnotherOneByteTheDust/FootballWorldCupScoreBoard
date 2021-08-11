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

    it('should finish a match succesfully', () => {
      scoreboard.finishGame(gameIdentifiers[1]);
      const game = scoreboard.getGame(gameIdentifiers[1]);

      expect(game).toBeUndefined();
    })

    it('should be able to get a finished game from record', () => {
      scoreboard.finishGame(gameIdentifiers[1]);
      const game = scoreboard.findFinishedGame(gameIdentifiers[1]);

      expect(game?.getId()).toEqual(gameIdentifiers[1]);
    })
  })

  describe('Update a game score', () => {
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

    it('should update a game score', () => {
      const newScore: [number, number] = [3, 5]

      scoreboard.updateGame(gameIdentifiers[1], newScore)
      const score = scoreboard.getGameScore(gameIdentifiers[1]);

      expect(score).toEqual(newScore);
    })

    it('should not be able to update a game score if it is negative', () => {
      const newScore: [number, number] = [-3, -5]

      const scoreBeforeUpdate = scoreboard.getGameScore(gameIdentifiers[1]);
      scoreboard.updateGame(gameIdentifiers[1], newScore)
      const scoreAfterUpdate = scoreboard.getGameScore(gameIdentifiers[1]);

      expect(scoreAfterUpdate).toEqual(scoreBeforeUpdate);
    })
  })
})
