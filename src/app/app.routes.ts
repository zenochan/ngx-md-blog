/**
 * Created by zenochan on 2016/12/1.
 */
import {Routes} from "@angular/router";
import {BlogsComponent} from "./blogs/blogs.component";
import {JdComponent} from "./jd/jd.component";
import {BlogComponent} from "./blog/blog.component";
export const routes: Routes = [
  {path: "blogs/:id", component: BlogComponent},
  {path: "blogs", component: BlogsComponent},
  {path: "jd/:id", component: JdComponent},
  {path: "**", redirectTo: "blogs"}
];
