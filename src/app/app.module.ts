import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {UtilsService} from './services/utils.service';
import {MarkdownComponent} from './common/markdown.component';
import {BlogsComponent} from './blogs/blogs.component';
import {ApiService} from './services/api.service';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {BlogComponent} from './blog/blog.component';
import {TestComponent} from './test/test.component';
import {EventsService} from './services/events.service';
import {NewBlogComponent} from './new-blog/new-blog.component';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimplemdeComponent} from './common/simplemde.component';
import {MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MarkdownComponent,
    SimplemdeComponent,
    BlogsComponent,
    BlogComponent,
    TestComponent,
    NewBlogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    FormsModule,
    HttpClientModule,
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
