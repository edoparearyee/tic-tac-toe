import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService } from '../game';
import { BoardComponent } from './board.component';
import { Player } from '../shared';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get XO value for player', () => {
    component.game.board$.next([
      [Player.one, Player.two, null],
      [Player.two, null, Player.one],
      [Player.one, null, null],
    ]);
    fixture.detectChanges();

    let result = (<HTMLElement>fixture.nativeElement).querySelector('.col:nth-child(1)').textContent.trim();

    expect(result).toBe('X');

    result = (<HTMLElement>fixture.nativeElement).querySelector('.col:nth-child(2)').textContent.trim();

    expect(result).toBe('O');

    result = (<HTMLElement>fixture.nativeElement).querySelector('.col:nth-child(3)').textContent.trim();

    expect(result).toBe('');
  });

  it('should return return true if winning tile', () => {
    component.game.winningTiles$.next([
      [0, 0], [0, 1], [0, 2]
    ]);
    fixture.detectChanges();

    component.isWinningTile(0, 0)
      .subscribe(result => expect(result).toBeTruthy());
    component.isWinningTile(0, 1)
      .subscribe(result => expect(result).toBeTruthy());
    component.isWinningTile(0, 2)
      .subscribe(result => expect(result).toBeTruthy());
    component.isWinningTile(1, 0)
      .subscribe(result => expect(result).toBeFalsy());
    component.isWinningTile(1, 1)
      .subscribe(result => expect(result).toBeFalsy());
    component.isWinningTile(1, 2)
      .subscribe(result => expect(result).toBeFalsy());
  });

  it('should return x and y values for horizontal line', () => {
    component.game.winningTiles$.next([
      [0, 0], [0, 1], [0, 2]
    ]);
    fixture.detectChanges();

    component.getLineXY()
      .subscribe(result =>
        expect(result).toEqual({
          x1: 0,
          y1: 47.25,
          x2: 283.5,
          y2: 47.25
        })
      );
  });

  it('should return x and y values for vertical line', () => {
    component.game.winningTiles$.next([
      [0, 1], [1, 1], [2, 1]
    ]);
    fixture.detectChanges();

    component.getLineXY()
      .subscribe(result =>
        expect(result).toEqual({
          x1: 141.75,
          y1: 0,
          x2: 141.75,
          y2: 283.5
        })
      );
  });

  it('should return x and y values for svg diagonal line', () => {
    component.game.winningTiles$.next([
      [0, 0], [1, 1], [2, 2]
    ]);
    fixture.detectChanges();

    component.getLineXY()
      .subscribe(result =>
        expect(result).toEqual({
          x1: 0,
          y1: 0,
          x2: 283.5,
          y2: 283.5
        })
      );
  });

  it('should return x and y values for svg diagonal line', () => {
    component.game.winningTiles$.next([
      [0, 2], [1, 1], [2, 0]
    ]);
    fixture.detectChanges();

    component.getLineXY()
      .subscribe(result =>
        expect(result).toEqual({
          x1: 283.5,
          y1: 0,
          x2: 0,
          y2: 283.5
        })
      );
  });

  it('should do nothing if no tiles', () => {
    component.game.winningTiles$.next([]);
    fixture.detectChanges();

    component.getLineXY()
      .subscribe(result =>
        expect(result).toEqual({
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        })
      );
  });
});
