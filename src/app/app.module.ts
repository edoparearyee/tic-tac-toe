import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameService } from './game';
import { BoardComponent } from './board';
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
    BoardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
