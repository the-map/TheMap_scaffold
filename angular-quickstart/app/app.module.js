"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var ng2_fullpage_1 = require("ng2-fullpage/ng2-fullpage");
var app_component_first_1 = require('./app.component.first');
var app_component_second_1 = require('./app.component.second');
var app_component_third_1 = require('./app.component.third');
var app_component_fourth_1 = require('./app.component.fourth');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [
                app_component_1.AppComponent,
                ng2_fullpage_1.MnFullpageDirective,
                app_component_first_1.FirstComponent,
                app_component_second_1.SecondComponent,
                app_component_third_1.ThirdComponent,
                app_component_fourth_1.FourthComponent
            ],
            bootstrap: [app_component_1.AppComponent, app_component_first_1.FirstComponent, app_component_second_1.SecondComponent, app_component_third_1.ThirdComponent, app_component_fourth_1.FourthComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map