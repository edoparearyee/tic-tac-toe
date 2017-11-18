import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GameService } from '../game';
import { Board, Player, XO } from '../shared';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {

  public board: Observable<Board> = this.game.board$;

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
}
