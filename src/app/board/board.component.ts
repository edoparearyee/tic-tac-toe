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

  private getLineXY(x: number, y: number): Observable<any> {
    const tileSize = 94.5;
    return this.game.winningTies$.pipe(
      take(1),
      map((tiles) => {
        const startRow = tiles[0][0];
        const startCol = tiles[0][1];
        const endRow = tiles[2][0];
        const endCol = tiles[2][1];
        let values = { x1: 0, y1: 0, x2: 0, y2: 0 };
        if (tiles.length) {
          values = {
            x1: (startCol === endCol) ? ((startCol + .5) * tileSize) :
              (startCol > endCol) ? (startCol + 1) * tileSize : startCol * tileSize,
            y1: (startRow === endRow) ? ((startRow + .5) * tileSize) : startRow * tileSize,
            x2: (startCol === endCol) ? ((endCol + .5) * tileSize) :
              (startCol > endCol) ? endCol * tileSize : (endCol + 1) * tileSize,
            y2: (startRow === endRow) ? ((endRow + .5) * tileSize) : (endRow + 1) * tileSize,
          };
        }
        return values;
      })
    );
  }
}
