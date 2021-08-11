import { FootballWorldCupScoreBoard } from '../../src/FootballWorldCupScoreBoard'
import { Team } from '../../src/Team';

let scoreboard = new FootballWorldCupScoreBoard();

interface Match {
  hometeam: string;
  awayteam: string;
  homescore: number;
  awayscore: number;
}

function generateMatchDatabase(data: Array<Match>): Array<string> {
  return data.map( match => {
    const homeTeam = new Team(match["hometeam"]);
    const awayTeam = new Team(match["awayteam"]);
    const gameId = scoreboard.newGame(homeTeam, awayTeam);
    scoreboard.updateGame(gameId, [match["homescore"], match["awayscore"]]);
    return gameId;
  })
}

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
      scoreboard = new FootballWorldCupScoreBoard();
      gameIdentifiers = []

      const data = [
        { hometeam: "Alemania", awayteam: "Francia", homescore: 0, awayscore: 0 },
        { hometeam: "España", awayteam: "Berlin", homescore: 0, awayscore: 0 },
        { hometeam: "Mexico", awayteam: "Argentina", homescore: 0, awayscore: 0 }
      ]

      gameIdentifiers = generateMatchDatabase(data);
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
      scoreboard = new FootballWorldCupScoreBoard();
      gameIdentifiers = []

      const data = [
        { hometeam: "Alemania", awayteam: "Francia", homescore: 0, awayscore: 0 },
        { hometeam: "España", awayteam: "Berlin", homescore: 0, awayscore: 0 },
        { hometeam: "Mexico", awayteam: "Argentina", homescore: 0, awayscore: 0 }
      ]

      gameIdentifiers = generateMatchDatabase(data);
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

  describe('Get summary of games', () => {
    let gameIdentifiers: Array<string>;

    beforeEach(() => {
      scoreboard = new FootballWorldCupScoreBoard();
    })

    it('should return summary of games ordered by total score', () => {
      const data: Array<Match> = [
        { hometeam: "Mexico", awayteam: "Canada", homescore: 0, awayscore: 5 },
        { hometeam: "Spain", awayteam: "Brazil", homescore: 10, awayscore: 2 },
        { hometeam: "Germany", awayteam: "France", homescore: 2, awayscore: 4 },
        { hometeam: "Argentina", awayteam: "Australia", homescore: 3, awayscore: 1 }
      ]
      gameIdentifiers = generateMatchDatabase(data);
      const expected = [gameIdentifiers[1], gameIdentifiers[2], gameIdentifiers[0], gameIdentifiers[3]]

      const matchSummaryIds = scoreboard.getMatchSummary().map(match => { return match?.getId() });

      expect(matchSummaryIds).toEqual(expected);
    })
  })
})
