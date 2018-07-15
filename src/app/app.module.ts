import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AgGridModule } from "ag-grid-angular";

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
