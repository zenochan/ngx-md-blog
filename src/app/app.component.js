"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent(events) {
        this.events = events;
        this.keywordInput = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("app start");
    };
    AppComponent.prototype.ngOnDestroy = function () {
    };
    AppComponent.prototype.search = function () {
        this.events.publish("search", this.keywordInput);
    };
    AppComponent.prototype.keywordKeydown = function (event) {
        event.keyCode == 13 && this.search();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'blog',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.less']
    })
], AppComponent);
exports.AppComponent = AppComponent;
