"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * 抓取京东商品基本价格
 */
var JdComponent = (function () {
    function JdComponent(route, sanitizer, api, events) {
        this.route = route;
        this.sanitizer = sanitizer;
        this.api = api;
        this.events = events;
        this.price = {};
    }
    JdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onSearch = function (keyword) {
            keyword = keyword.replace(/https:\/\/item.jd.com\/(\d+).html/ig, function (rex, p1) { return p1; });
            if (/\d/.test(keyword)) {
                _this.loadJdProduct(keyword);
            }
            else {
                _this.src = _this.sanitizer.bypassSecurityTrustResourceUrl("https://search.jd.com/Search?enc=utf-8&keyword=" + keyword);
            }
        };
        this.events.subscribe("search", this.onSearch);
        this.sub = this.route.params.subscribe(function (params) { return _this.loadJdProduct(params['id']); });
    };
    JdComponent.prototype.loadJdProduct = function (id) {
        var _this = this;
        this.id = id;
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl("https://item.jd.com/" + this.id + ".html");
        this.api.jsonpGet("http://p.3.cn/prices/get?callback=JSONP_CALLBACK&skuid=J_" + this.id)
            .map(function (res) { return res.json()[0]; })
            .toPromise()
            .then(function (res) {
            _this.price = res;
            console.log('price', _this.price);
        })
            .catch(function (err) { return console.error(err); });
    };
    JdComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.events.unsubscribe('search', this.onSearch);
    };
    JdComponent.prototype.onLoadJd = function () {
        console.log('onLoadJd');
    };
    return JdComponent;
}());
JdComponent = __decorate([
    core_1.Component({
        selector: 'app-jd',
        templateUrl: './jd.component.html',
        styleUrls: ['./jd.component.less']
    })
], JdComponent);
exports.JdComponent = JdComponent;
