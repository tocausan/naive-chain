import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavComponent } from './components/nav/nav.component';
import { BlocksComponent } from './components/blocks/blocks.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BlocksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
