import { TestBed, async } from '@angular/core/testing';

import { GameService } from './game.service';
import { Player, Board, GameState } from '../shared';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });

    gameService = TestBed.get(GameService);
  });

  it('should update the game board', async(() => {
    gameService.updateBoard(0, 0);
    expect(gameService.board[0][0]).toEqual(Player.one);

    gameService.updateBoard(1, 0);
    expect(gameService.board[1][0]).toEqual(Player.two);
  }));

  it('should NOT update the game board', async(() => {
    gameService.updateBoard(0, 0);
    expect(gameService.board[0][0]).toEqual(Player.one);

    gameService.updateBoard(0, 0);
    expect(gameService.board[0][0]).toEqual(Player.one);
  }));

  it('should switch players', async(() => {
    expect(gameService.currentPlayer).toEqual(Player.one);
    gameService.switchTurns();
    expect(gameService.currentPlayer).toEqual(Player.two);
  }));

  it('should not switch players after game is won', async(() => {
    gameService.updateBoard(0, 0);
    expect(gameService.currentPlayer).toEqual(Player.two);
    gameService.updateBoard(1, 0);
    expect(gameService.currentPlayer).toEqual(Player.one);
    gameService.updateBoard(0, 1);
    expect(gameService.currentPlayer).toEqual(Player.two);
    gameService.updateBoard(1, 1);
    expect(gameService.currentPlayer).toEqual(Player.one);
    gameService.updateBoard(0, 2);
    expect(gameService.currentPlayer).toEqual(Player.one);
  }));

  it('should check result', async(() => {
    const spy = spyOn(gameService, 'checkLine');
    gameService.board = [
      [Player.two, Player.one, Player.two],
      [Player.one, Player.two, Player.one],
      [Player.one, Player.two, Player.one]
    ];
    gameService.checkResult();
    expect(spy).toHaveBeenCalledTimes(3 + 3 + 2);
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[0][0], gameService.board[0][1], gameService.board[0][2]],
      [[0, 0], [0, 1], [0, 2]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[1][0], gameService.board[1][1], gameService.board[1][2]],
      [[1, 0], [1, 1], [1, 2]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[2][0], gameService.board[2][1], gameService.board[2][2]],
      [[2, 0], [2, 1], [2, 2]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[0][0], gameService.board[1][0], gameService.board[2][0]],
      [[0, 0], [1, 0], [2, 0]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[0][1], gameService.board[1][1], gameService.board[2][1]],
      [[0, 1], [1, 1], [2, 1]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[0][2], gameService.board[1][2], gameService.board[2][2]],
      [[0, 2], [1, 2], [2, 2]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[0][0], gameService.board[1][1], gameService.board[2][2]],
      [[0, 0], [1, 1], [2, 2]]
    );
    expect(spy).toHaveBeenCalledWith(
      [gameService.board[0][2], gameService.board[1][1], gameService.board[2][0]],
      [[0, 2], [1, 1], [2, 0]]
    );
  }));

  it('should declare a draw', async(() => {
    gameService.board = [
      [Player.two, Player.one, Player.two],
      [Player.one, Player.two, Player.one],
      [Player.one, Player.two, Player.one]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.draw);
  }));

  it('should change game state', async(() => {
    gameService.board = [
      [Player.one, null      , Player.two],
      [Player.one, Player.one, Player.two],
      [null      , null      , Player.two]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.playerTwoWin);

    gameService.state = GameState.inProgress;
    gameService.board = [
      [Player.one, Player.one, Player.one],
      [null      , Player.two, Player.two],
      [Player.one, null      , Player.two]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.playerOneWin);

    gameService.state = GameState.inProgress;
    gameService.board = [
      [null      , Player.one, Player.one],
      [null      , Player.two, null      ],
      [Player.one, null      , Player.two]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.inProgress);

    gameService.state = GameState.inProgress;
    gameService.board = [
      [Player.two, Player.one, null      ],
      [null      , Player.two, Player.one],
      [Player.one, null      , Player.two]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.playerTwoWin);

    gameService.state = GameState.inProgress;
    gameService.board = [
      [Player.two, Player.two, Player.one],
      [null      , Player.one, Player.one],
      [Player.one, null      , Player.two]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.playerOneWin);

    gameService.state = GameState.inProgress;
    gameService.board = [
      [Player.two, Player.one, Player.one],
      [Player.two, Player.one, Player.one],
      [Player.two, null      , Player.two]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.playerTwoWin);

    gameService.state = GameState.inProgress;
    gameService.board = [
      [Player.two, Player.one, Player.one],
      [Player.one, Player.one, Player.two],
      [Player.two, Player.two, Player.one]
    ];

    gameService.checkResult();
    expect(gameService.state).toEqual(GameState.draw);
  }));

  it('should check lines', async(() => {
    gameService.checkLine([Player.one, Player.one, Player.one], [[0, 0], [0, 1], [0, 2]]);
    expect(gameService.state).toEqual(GameState.playerOneWin);

    gameService.state = GameState.inProgress;

    gameService.checkLine([Player.two, Player.one, Player.two], [[0, 0], [0, 1], [0, 2]]);
    expect(gameService.state).toEqual(GameState.inProgress);

    gameService.state = GameState.inProgress;

    gameService.checkLine([Player.two, Player.two, Player.two], [[0, 0], [0, 1], [0, 2]]);
    expect(gameService.state).toEqual(GameState.playerTwoWin);
  }));

  it('should reset game', async(() => {
    gameService.state = GameState.playerTwoWin;
    gameService.currentPlayer = Player.two;
    gameService.board = [
      [Player.one,       null, Player.one],
      [Player.one, Player.one, Player.two],
      [Player.two, Player.two, Player.two]
    ];

    gameService.reset();
    expect(gameService.board).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    expect(gameService.state).toEqual(GameState.inProgress);
    expect(gameService.currentPlayer).toEqual(Player.one);
  }));
});
