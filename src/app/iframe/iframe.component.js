"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IframeComponent = (function () {
    function IframeComponent(route, sanitizor) {
        this.route = route;
        this.sanitizor = sanitizor;
    }
    IframeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (param) {
            _this.url = _this.sanitizor.bypassSecurityTrustResourceUrl(param['url']);
            console.log(_this.url);
        });
    };
    return IframeComponent;
}());
IframeComponent = __decorate([
    core_1.Component({
        selector: 'app-iframe',
        templateUrl: './iframe.component.html',
        styleUrls: ['./iframe.component.less']
    })
], IframeComponent);
exports.IframeComponent = IframeComponent;
