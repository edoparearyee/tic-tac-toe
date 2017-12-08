import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Player, GameState, Board } from '../shared';

@Injectable()
export class GameService {

  public board: Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  public currentPlayer = Player.one;
  public state: GameState = GameState.inProgress;
  public winningTies: number[][] = [];

  public board$: BehaviorSubject<Board> = new BehaviorSubject(this.board);
  public currentPlayer$: BehaviorSubject<Player> = new BehaviorSubject(this.currentPlayer);
  public state$: BehaviorSubject<GameState> = new BehaviorSubject(this.state);
  public winningTies$: BehaviorSubject<number[][]> = new BehaviorSubject([]);

  public updateBoard(row: number, col: number): void {
    if (this.board[row][col] === null && this.state === GameState.inProgress) {
      this.board[row][col] = this.currentPlayer;
      this.board$.next(this.board);
      this.checkResult();
      if (this.state === GameState.inProgress) {
        this.switchTurns();
      }
    }
  }

  public switchTurns(): void {
    this.currentPlayer = (this.currentPlayer === Player.one) ? Player.two : Player.one;
    this.currentPlayer$.next(this.currentPlayer);
  }

  public checkResult(): void {
    this.board.forEach((row, i) => this.checkLine(row, [[i, 0], [i, 1], [i, 2]]));
    this.board.forEach((_, r) => this.checkLine(this.board.map((cols) => cols[r]), [[0, r], [1, r], [2, r]]));
    this.checkLine([ this.board[0][0], this.board[1][1], this.board[2][2] ], [[0, 0], [1, 1], [2, 2]] );
    this.checkLine([ this.board[0][2], this.board[1][1], this.board[2][0] ], [[0, 2], [1, 1], [2, 0]]);
    if (this.board.every(row => row.every(col => col !== null)) && this.state === GameState.inProgress) {
      this.state = GameState.draw;
    }
    this.state$.next(this.state);
  }

  public checkLine(line: Player[], tiles: number[][]): void {
    if (this.state === GameState.inProgress) {
      if (line.every(player => player === Player.one)) {
        this.state = GameState.playerOneWin;
        this.winningTies = tiles;
        this.winningTies$.next(this.winningTies);
        return;
      }

      if (line.every(player => player === Player.two)) {
        this.state = GameState.playerTwoWin;
        this.winningTies = tiles;
        this.winningTies$.next(this.winningTies);
        return;
      }
    }
  }

  public reset(): void {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    this.state = GameState.inProgress;
    this.currentPlayer = Player.one;
    this.winningTies = [];

    this.board$.next(this.board);
    this.currentPlayer$.next(this.currentPlayer);
    this.state$.next(this.state);
    this.winningTies$.next(this.winningTies);
  }
}
