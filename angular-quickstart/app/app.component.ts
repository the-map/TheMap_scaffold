import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
        <div mnFullpage 
            [mnFullpageNavigation]="true" 
            [mnFullpageKeyboardScrolling]="true"
            [mnFullpageSlidesNavigation]="true"
            [mnFullpageControlArrows]="false">
            <div first class="section fp-section fp-table"></div>
            <div second class="section fp-section fp-table"></div>
            <div class="section fp-section fp-table fp-completely" third></div>
            <div fourth class="section fp-section fp-table"></div>
        </div>        
    `
})
export class AppComponent {
}