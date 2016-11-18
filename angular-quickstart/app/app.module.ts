import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { MnFullpageDirective } from "ng2-fullpage/ng2-fullpage";

import {FirstComponent} from './app.component.first';
import {SecondComponent} from './app.component.second';
import {ThirdComponent} from './app.component.third';
import {FourthComponent} from './app.component.fourth';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    MnFullpageDirective,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    FourthComponent
  ],
  bootstrap: [ AppComponent, FirstComponent, SecondComponent, ThirdComponent, FourthComponent ]
})
export class AppModule {
}
