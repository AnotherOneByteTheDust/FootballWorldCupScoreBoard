import { FootballWorldCupScoreBoard } from '../../src'

describe('Competition Score Board', () => {
  beforeEach(() => {
      FootballWorldCupScoreBoard scoreboard;
  });

  describe('Start a new game', () => {
    it('Should be able to start a new game', () => {
      const game = scoreboard.newGame();

      expect(game).toBeDefined();
    })
  })
})
