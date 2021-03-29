import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { DisplayPipe } from './pipes/display.pipe';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DisplayPipe,
    HistoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
