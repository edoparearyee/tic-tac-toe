import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { GameService } from './game';
import { GameState, Player } from './shared';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should return game state', async(() => {
    app.isPlayerOneTurn.subscribe(result => expect(result).toBeTruthy());
    app.isPlayerTwoTurn.subscribe(result => expect(result).toBeFalsy());
    app.isDraw.subscribe(result => expect(result).toBeFalsy());
    app.hasResult.subscribe(result => expect(result).toBeFalsy());
    app.isPlayerOneWin.subscribe(result => expect(result).toBeFalsy());
    app.isPlayerTwoWin.subscribe(result => expect(result).toBeFalsy());
  }));

  it('should get update from game service', async(() => {
    let isDraw;
    let isPlayerOneTurn;
    let isPlayerTwoTurn;
    app.isDraw.subscribe(result => isDraw = result);
    app.isPlayerOneTurn.subscribe(result => isPlayerOneTurn = result);
    app.isPlayerTwoTurn.subscribe(result => isPlayerTwoTurn = result);
    expect(isDraw).toBeFalsy();
    expect(isPlayerOneTurn).toBeTruthy();
    expect(isPlayerTwoTurn).toBeFalsy();

    app.game.state$.next(GameState.draw);
    app.game.currentPlayer$.next(Player.two);
    app.isDraw.subscribe(result => isDraw = result);
    expect(isDraw).toBeTruthy();
    expect(isPlayerOneTurn).toBeFalsy();
    expect(isPlayerTwoTurn).toBeTruthy();
  }));

  it('should display current player', async(() => {
    app.game.currentPlayer$.next(Player.two);
    fixture.detectChanges();
    const result = (<HTMLElement>fixture.nativeElement).querySelector('.player-current').textContent;
    expect(result).toContain('Player 2');
    expect(result).not.toContain('Player 1');
  }));

  it('should display winning player', async(() => {
    app.game.state$.next(GameState.playerOneWin);
    fixture.detectChanges();
    const result = (<HTMLElement>fixture.nativeElement).querySelector('.winner').textContent;
    expect(result).toEqual('Player 1 has won!');
    expect(result).not.toContain('Player 2');
    expect(result).not.toContain('Draw');
  }));
});
