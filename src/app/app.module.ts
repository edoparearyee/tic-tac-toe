import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameService } from './game';
import { GameBoardComponent } from './game-board/game-board.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    GameService
  ],
  declarations: [
    AppComponent,
    GameBoardComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
