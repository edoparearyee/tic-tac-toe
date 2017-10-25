import { Component } from '@angular/core';
import { Result, Player } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public result: Result;

  public turn: Player;

  public get player1Won(): boolean {
    return this.result === Result.player1;
  }

  public get player2Won(): boolean {
    return this.result === Result.player2;
  }

  public get isDraw(): boolean {
    return this.result === Result.draw;
  }

  public get hasResult(): boolean {
    return this.result !== Result.inProgress;
  }

  public get player1Turn(): boolean {
    return this.turn === Player.player1;
  }

  public get player2Turn(): boolean {
    return this.turn === Player.player2;
  }

  public onResult(result: Result): void {
    this.result = result;
  }

  public onTurnChange(player: Player): void {
    this.turn = player;
  }
}
