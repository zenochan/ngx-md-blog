"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var utils_service_1 = require("./services/utils.service");
var markdown_component_1 = require("./common/markdown.component");
var blogs_component_1 = require("./blogs/blogs.component");
var api_service_1 = require("./services/api.service");
var jd_component_1 = require("./jd/jd.component");
var angular2_infinite_scroll_1 = require("angular2-infinite-scroll");
var blog_component_1 = require("./blog/blog.component");
var navbar_component_1 = require("./navbar/navbar.component");
var test_component_1 = require("./test/test.component");
var events_service_1 = require("./services/events.service");
var new_blog_component_1 = require("./new-blog/new-blog.component");
var material_1 = require("@angular/material");
require("hammerjs");
var iframe_component_1 = require("./iframe/iframe.component");
var animations_1 = require("@angular/platform-browser/animations");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            markdown_component_1.MarkdownComponent,
            blogs_component_1.BlogsComponent,
            jd_component_1.JdComponent,
            blog_component_1.BlogComponent,
            navbar_component_1.NavbarComponent,
            test_component_1.TestComponent,
            new_blog_component_1.NewBlogComponent,
            iframe_component_1.IframeComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            angular2_infinite_scroll_1.InfiniteScrollModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            material_1.MaterialModule,
            // CustomBrowserJsonp,
            material_1.MdSnackBarModule,
            router_1.RouterModule.forRoot(app_routes_1.routes)
        ],
        providers: [
            api_service_1.ApiService,
            events_service_1.EventsService,
            utils_service_1.UtilsService
        ],
        bootstrap: [app_component_1.AppComponent],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], AppModule);
exports.AppModule = AppModule;
