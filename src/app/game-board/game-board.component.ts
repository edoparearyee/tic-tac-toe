import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export type Player = 'X' | 'O';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @Input('player')
  public player: Player = 'X';

  @Output('onResult')
  public onResult = new EventEmitter<string>();

  @Output('onTurnChange')
  public onTurnChange = new EventEmitter<string>();

  public state: Player[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  public ngOnInit(): void {
    this.onTurnChange.emit('Player 1');
  }

  public onClick(row: number, col: number): void {
    this.state[row][col] = this.player;
    this.switchTurns();
    this.checkResult();
  }

  public switchTurns(): void {
    if (this.player === 'O') {
      this.player = 'X';
      this.onTurnChange.emit('Player 1');
    } else {
      this.player = 'O';
      this.onTurnChange.emit('Player 2');
    }
  }

  public checkResult(): void {
    this.state.forEach(row => this.checkLine(row));
    for (let i = 0; i < 3; i++) {
      this.checkLine(this.state.map(row => row[i]));
    }
    this.checkLine([ this.state[0][0], this.state[1][1], this.state[2][2] ]);
    this.checkLine([ this.state[0][2], this.state[1][1], this.state[2][0] ]);
  }

  public checkLine(line: Player[]): void {
    if (line.every(player => player === 'O')) {
      this.onResult.emit('Player 2');
      return;
    }

    if (line.every(player => player === 'X')) {
      this.onResult.emit('Player 1');
    }
  }

  public reset(): void {
    this.state = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    this.player = 'X';

    this.onTurnChange.emit('Player 1');
    this.onResult.emit(null);
  }

}
