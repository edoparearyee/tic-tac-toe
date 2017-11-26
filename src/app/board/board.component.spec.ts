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
});
