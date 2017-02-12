import {BrowserModule} from "@angular/platform-browser";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {LteContentDirective} from "./lte-content.directive";
import {UtilsService} from "./services/utils.service";
import {MarkdownComponent} from "./common/markdown.component";
import {BlogsComponent} from "./blogs/blogs.component";
import {ApiService} from "./services/api.service";
import {JdComponent} from './jd/jd.component';
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {BlogComponent} from './blog/blog.component';
import {BrowserJsonp} from "@angular/http/src/backends/browser_jsonp";
import {CustomBrowserJsonp} from "./services/custom-browser-jsonp";

@NgModule({
  declarations: [
    AppComponent,
    LteContentDirective,
    MarkdownComponent,
    BlogsComponent,
    JdComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ApiService,
    {provide: BrowserJsonp, useClass: CustomBrowserJsonp},
    UtilsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule
{
}
