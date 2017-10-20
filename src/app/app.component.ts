import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public winner: string;

  public turn: string;

  public onResult(name: string): void {
    this.winner = name;
  }

  public onTurnChange(name: string): void {
    this.turn = name;
  }
}
