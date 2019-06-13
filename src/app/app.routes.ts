/**
 * Created by zenochan on 2016/12/1.
 */
import {Routes} from '@angular/router';
import {BlogsComponent} from './blogs/blogs.component';
import {BlogComponent} from './blog/blog.component';
import {TestComponent} from './test/test.component';

export const routes: Routes = [
  {path: 'blogs/:id', component: BlogComponent},
  {path: 'blogs', component: BlogsComponent},
  {path: 'blogs/tags/:tag', component: BlogsComponent},
  {path: 'jd/:id', loadChildren: () => import('./jd/jd.module').then(m => m.JdModule)},
  {path: 'iframe/:url', loadChildren: () => import('./iframe/iframe.module').then(m => m.IframeModule)},

  {path: 'test', component: TestComponent},
  {path: '**', redirectTo: 'blogs'}

];
