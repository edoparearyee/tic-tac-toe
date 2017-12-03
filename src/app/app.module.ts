import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { GameService } from './game';
import { BoardComponent } from './board';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
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
