import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export enum Player {
  player1 = 'X',
  player2 = 'O'
}
export enum Result {
  player1,
  player2,
  inProgress,
  draw
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @Input('player')
  public player: Player = Player.player1;

  @Output('onResult')
  public onResult = new EventEmitter<Result>();

  @Output('onTurnChange')
  public onTurnChange = new EventEmitter<Player>();

  public result: Result = Result.inProgress;

  public state: Player[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  public ngOnInit(): void {
    this.onTurnChange.emit(Player.player1);
    this.onResult.emit(Result.inProgress);
  }

  public onClick(row: number, col: number): void {
    if (!this.state[row][col] && this.result === Result.inProgress) {
      this.state[row][col] = this.player;
      this.checkResult();
      if (this.result === Result.inProgress) {
        this.switchTurns();
      }
    }
  }

  public switchTurns(): void {
    this.player = (this.player === Player.player2) ? Player.player1 : Player.player2;
    this.onTurnChange.emit(this.player);
  }

  public checkResult(): void {
    this.state.forEach(row => this.checkLine(row));
    for (let i = 0; i < 3; i++) {
      this.checkLine(this.state.map(row => row[i]));
    }
    this.checkLine([ this.state[0][0], this.state[1][1], this.state[2][2] ]);
    this.checkLine([ this.state[0][2], this.state[1][1], this.state[2][0] ]);
    if (!this.result && this.state.every(row => row.every(col => !col))) {
      this.result = Result.draw;
      this.onResult.emit(this.result);
    }
  }

  public checkLine(line: Player[]): void {
    if (line.every(player => player === Player.player2)) {
      this.result = Result.player2;
      this.onResult.emit(this.result);
      return;
    }

    if (line.every(player => player === Player.player1)) {
      this.result = Result.player1;
      this.onResult.emit(this.result);
    }
  }

  public reset(): void {
    this.state = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    this.result = Result.inProgress;
    this.player = Player.player1;

    this.onTurnChange.emit(this.player);
    this.onResult.emit(this.result);
  }

}
