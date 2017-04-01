"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BlogComponent = (function () {
    function BlogComponent(route, api) {
        this.route = route;
        this.api = api;
    }
    BlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (param) {
            _this.getBlog(param["id"]);
        });
    };
    BlogComponent.prototype.getBlog = function (id) {
        var _this = this;
        this.api.get("api/blogs/" + id).subscribe(function (res) {
            _this.blog = res[0].blog;
        }, function (error) { return alert(error); });
    };
    return BlogComponent;
}());
BlogComponent = __decorate([
    core_1.Component({
        selector: 'app-blog',
        templateUrl: './blog.component.html',
        styleUrls: ['./blog.component.less']
    })
], BlogComponent);
exports.BlogComponent = BlogComponent;
