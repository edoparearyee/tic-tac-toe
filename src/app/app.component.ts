import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Player, GameState } from './shared';
import { GameService } from './game';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public game: GameService) { }

  public get isPlayerOneWin(): Observable<boolean> {
    return this.game.state$
      .map((state) => state === GameState.playerOneWin);
  }

  public get isPlayerTwoWin(): Observable<boolean> {
    return this.game.state$
      .map((state) => state === GameState.playerTwoWin);
  }

  public get isDraw(): Observable<boolean> {
    return this.game.state$
      .map((state) => state === GameState.draw);
  }

  public get hasResult(): Observable<boolean> {
    return this.game.state$
      .map((state) => state !== GameState.inProgress);
  }

  public get isPlayerOneTurn(): Observable<boolean> {
    return this.game.currentPlayer$
      .map((player) => player === Player.one);
  }

  public get isPlayerTwoTurn(): Observable<boolean> {
    return this.game.currentPlayer$
      .map((player) => player === Player.two);
  }
}
