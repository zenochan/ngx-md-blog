import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {UtilsService} from './services/utils.service';
import {MarkdownComponent} from './common/markdown.component';
import {BlogsComponent} from './blogs/blogs.component';
import {ApiService} from './services/api.service';
import {JdComponent} from './jd/jd.component';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {BlogComponent} from './blog/blog.component';
import {NavbarComponent} from './navbar/navbar.component';
import {TestComponent} from './test/test.component';
import {EventsService} from './services/events.service';
import {NewBlogComponent} from './new-blog/new-blog.component';
import 'hammerjs';
import {IframeComponent} from './iframe/iframe.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimplemdeComponent} from './common/simplemde.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatTabsModule} from '@angular/material';


@NgModule({
    declarations: [
        AppComponent,
        MarkdownComponent,
        SimplemdeComponent,
        BlogsComponent,
        JdComponent,
        BlogComponent,
        NavbarComponent,
        TestComponent,
        NewBlogComponent,
        IframeComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        MatSnackBarModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    providers: [
        ApiService,
        EventsService,
        UtilsService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}
