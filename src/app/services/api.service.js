"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var environment_1 = require("../../environments/environment");
var ApiService = ApiService_1 = (function () {
    function ApiService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.apiUrl = environment_1.environment.production
            ? "http://blogapi.mjtown.cn/"
            : "http://localhost/service/laravel5.3/";
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        this.options = new http_1.RequestOptions({
            headers: headers
        });
    }
    ApiService.prototype.get = function (path) {
        var href = path.startsWith("http") ? path : this.apiUrl + path;
        return this.http.get(href).map(function (res) {
            var result = res.json();
            if (result.err_code != 0) {
                throw result.err_msg;
            }
            return result.data;
        });
    };
    ApiService.prototype.post = function (url, body) {
        return this.http.post(this.apiUrl + url, ApiService_1.serializeData(body), this.options).map(function (res) {
            var result = res.json();
            if (result.err_code != 0) {
                throw result.err_msg;
            }
            return result.data;
        });
    };
    ApiService.prototype.patch = function (url, body) {
        return this.http.patch(this.apiUrl + url, ApiService_1.serializeData(body), this.options).map(function (res) {
            var result = res.json();
            if (result.err_code != 0) {
                throw result.err_msg;
            }
            return result.data;
        });
    };
    ApiService.prototype.delete = function (url) {
        return this.http.delete(this.apiUrl + url).map(function (res) {
            var result = res.json();
            if (result.err_code != 0) {
                throw result.err_msg;
            }
            return result.data;
        });
    };
    ApiService.prototype.jsonpGet = function (url) {
        return this.jsonp.get(url);
    };
    ApiService.serializeData = function (data) {
        // If this is not an object, defer to native stringification.
        if (typeof data != "object") {
            return ((data == null) ? "" : data.toString());
        }
        var buffer = [];
        // Serialize each key in the object.
        for (var name_1 in data) {
            if (!data.hasOwnProperty(name_1)) {
                continue;
            }
            var value = data[name_1];
            buffer.push(encodeURIComponent(name_1) +
                "=" +
                encodeURIComponent((value == null) ? "" : value));
        }
        // Serialize the buffer and clean it up for transportation.
        var source = buffer
            .join("&")
            .replace(/%20/g, "+");
        return (source);
    };
    return ApiService;
}());
ApiService = ApiService_1 = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
var ApiService_1;
