import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { GameService } from '../game';
import { Board, Player, XO } from '../shared';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(public game: GameService) { }

  private getXO(player: Player): XO {
    let symbol: XO;

    switch (player) {
      case Player.one:
        symbol = 'X';
        break;
      case Player.two:
        symbol = 'O';
        break;
      default:
        symbol = '';
        break;
    }

    return symbol;
  }

  private isWinningTile(x: number, y: number): Observable<boolean> {
    return this.game.winningTies$.pipe(
      take(1),
      map((tiles) => tiles.map(t => JSON.stringify(t)).includes(JSON.stringify([x, y])))
    );
  }

  private get(x: number, y: number): Observable<boolean> {
    return this.game.winningTies$.pipe(
      take(1),
      map((tiles) => tiles.map(t => JSON.stringify(t)).includes(JSON.stringify([x, y])))
    );
  }
}
