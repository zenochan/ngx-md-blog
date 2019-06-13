import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JdComponent} from './jd.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [JdComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: JdComponent}])
  ]
})
export class JdModule {
}
