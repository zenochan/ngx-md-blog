/**
 * Created by zenochan on 2016/12/1.
 */
import {Routes} from "@angular/router";
import {BlogsComponent} from "./blogs/blogs.component";
import {JdComponent} from "./jd/jd.component";
import {BlogComponent} from "./blog/blog.component";
import {TestComponent} from "./test/test.component";
import {IframeComponent} from "./iframe/iframe.component";
export const routes: Routes = [
  {path: "blogs/:id", component: BlogComponent},
  {path: "blogs", component: BlogsComponent},
  {path: "blogs/tags/:tag", component: BlogsComponent},
  {path: "jd/:id", component: JdComponent},
  {path: "iframe/:url", component: IframeComponent},
  {path: 'test', component: TestComponent},
  {path: "**", redirectTo: "blogs"}

];
