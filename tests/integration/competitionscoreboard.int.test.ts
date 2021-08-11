import { CompetitionScoreBoard } from '../../src/CompetitionScoreBoard'
import { Team } from '../../src/Team';

let scoreboard = new CompetitionScoreBoard();

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
    const matchId = scoreboard.newMatch(homeTeam, awayTeam);
    scoreboard.updateMatch(matchId, [match["homescore"], match["awayscore"]]);
    return matchId;
  })
}

describe('Competition Score Board', () => {

  describe('Start a new match', () => {

    let match: string;

    beforeAll(() => {
      const hostTeam = new Team("Alemania");
      const awayTeam = new Team("Francia");

      match = scoreboard.newMatch(hostTeam, awayTeam);
    })

    it('should be able to start a new match', () => {
      expect(match).toBeDefined();
    })

    it('should have total score equals to 0 when a match is started', () => {
      const totalScore = scoreboard.getMatchTotalScore(match);

      expect(totalScore).toEqual(0);
    })
  })

  describe('Finish a match', () => {

    let matches: Array<string>;

    beforeEach(() => {
      scoreboard = new CompetitionScoreBoard();
      matches = []

      const data = [
        { hometeam: "Alemania", awayteam: "Francia", homescore: 0, awayscore: 0 },
        { hometeam: "España", awayteam: "Berlin", homescore: 0, awayscore: 0 },
        { hometeam: "Mexico", awayteam: "Argentina", homescore: 0, awayscore: 0 }
      ]

      matches = generateMatchDatabase(data);
    })

    it('should finish a match succesfully', () => {
      scoreboard.finishMatch(matches[1]);
      const match = scoreboard.getMatch(matches[1]);

      expect(match).toBeUndefined();
    })
  })

  describe('Update a match score', () => {
    let matches: Array<string>;

    beforeEach(() => {
      scoreboard = new CompetitionScoreBoard();
      matches = []

      const data = [
        { hometeam: "Alemania", awayteam: "Francia", homescore: 0, awayscore: 0 },
        { hometeam: "España", awayteam: "Berlin", homescore: 0, awayscore: 0 },
        { hometeam: "Mexico", awayteam: "Argentina", homescore: 0, awayscore: 0 }
      ]

      matches = generateMatchDatabase(data);
    })

    it('should update a match score', () => {
      const newScore: [number, number] = [3, 5]

      scoreboard.updateMatch(matches[1], newScore)
      const score = scoreboard.getMatchScore(matches[1]);

      expect(score).toEqual(newScore);
    })

    it('should not be able to update a match score if it is negative', () => {
      const newScore: [number, number] = [-3, -5]

      const scoreBeforeUpdate = scoreboard.getMatchScore(matches[1]);
      scoreboard.updateMatch(matches[1], newScore)
      const scoreAfterUpdate = scoreboard.getMatchScore(matches[1]);

      expect(scoreAfterUpdate).toEqual(scoreBeforeUpdate);
    })
  })

  describe('Get summary of matchs', () => {
    let matches: Array<string>;

    beforeEach(() => {
      scoreboard = new CompetitionScoreBoard();
    })

    it('should return summary of matchs ordered by total score', () => {
      const data: Array<Match> = [
        { hometeam: "Mexico", awayteam: "Canada", homescore: 0, awayscore: 5 },
        { hometeam: "Spain", awayteam: "Brazil", homescore: 10, awayscore: 2 },
        { hometeam: "Germany", awayteam: "France", homescore: 2, awayscore: 4 },
        { hometeam: "Argentina", awayteam: "Australia", homescore: 3, awayscore: 1 }
      ]
      matches = generateMatchDatabase(data);
      const expected = [matches[1], matches[2], matches[0], matches[3]]

      const matchSummaryIds = scoreboard.getMatchSummary().map(match => { return match?.getId() });

      expect(matchSummaryIds).toEqual(expected);
    })

    it('should return summary of matchs ordered by the most recent match if total score is the same', () => {
      const data: Array<Match> = [
        { hometeam: "Mexico", awayteam: "Canada", homescore: 0, awayscore: 5 },
        { hometeam: "Spain", awayteam: "Brazil", homescore: 10, awayscore: 2 },
        { hometeam: "Germany", awayteam: "France", homescore: 2, awayscore: 2 },
        { hometeam: "Uruguay", awayteam: "Italy", homescore: 6, awayscore: 6 },
        { hometeam: "Argentina", awayteam: "Australia", homescore: 3, awayscore: 1 }
      ]
      matches = generateMatchDatabase(data);
      const expected = [matches[3], matches[1], matches[0],
                        matches[4], matches[2]];

      const matchSummaryIds = scoreboard.getMatchSummary().map(match => { return match?.getId() });

      expect(matchSummaryIds).toEqual(expected);
    })
  })
})
